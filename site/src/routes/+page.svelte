<script lang="ts">
	import '$lib/global.css';
	import { convert } from 'baht';
	import { diffChars, type Diff } from 'diff';
	let value = '9998830750500';
	const samples = [
		'0',
		'0.05',
		' 0.5',
		'1',
		'5',
		'10',
		'11',
		'21.25',
		'12345',
		'12345.67',
		'0.004',
		'0.005',
		'1.004',
		'1.005',
		'0.994',
		'0.995',
		'1.994',
		'1.995',
		'100001',
		'1000001',
		'1001000001',
		'1001001000001',
		'9009009000000',
		'9998830750500',
		'123001998830750501',
		'4123001998830750501'
	];

	function displayDiff(a: string, b: string) {
		let diffs = diffChars(a, b);

		return diffs
			.map((part: Diff) => (part.added ? `<b>${part.value}</b>` : part.removed ? '' : part.value))
			.join('')
			.replace(/<\/b>([^<]*)<b>/g, '$1');
	}
</script>

<main class="container">
	<h1>baht.js แปลงจำนวนเงินเป็นคำอ่าน</h1>
	<p>Convert number to Thai Baht format, but faster [O(n)] & fully typed.</p>
	<div class="input-number">
		<input type="text" bind:value placeholder="กรอกจำนวนเงิน" />
	</div>
	<div class="result">
		<p>
			{new Intl.NumberFormat('th-TH', {
				style: 'currency',
				currency: 'THB',
				minimumFractionDigits: 0,
				maximumFractionDigits: 2
			}).format(+value)} -
			{convert(value)}
		</p>
		<p>
			ปัดค่าเศษสตางค์ (<code>roundSatangs</code>) - {@html displayDiff(
				convert(value) as string,
				convert(value, { roundSatangs: true }) as string
			)}
		</p>
		<p>
			ใช้ "เอ็ด" ทุกจำนวน (<code>strictEt</code>) - {@html displayDiff(
				convert(value) as string,
				convert(value, { strictEt: true }) as string
			)}
		</p>
	</div>
	<h3>ตัวอย่างผลลัพธ์</h3>
	<p>
		กรุณาเช็คให้แน่ใจว่าผลลัพธ์ตัวอย่างดังต่อไปนี้ ถูกต้องตามมาตรฐานที่ท่านยอมรับ ก่อนนำไปใช้งาน
	</p>
	<div class="table-wrapper">
		<table style="min-width:480px">
			<thead>
				<tr>
					<th style="width:100px;" class="text-end"><span class="thead">จำนวนเงิน</span> </th>
					<th class="text-start"><span class="thead">คำอ่าน</span></th>
					<th class="text-start"
						><span class="thead">ปัดค่าเศษสตางค์<br />(<code>roundSatangs</code>)</span></th
					>
					<th class="text-start"
						><span class="thead">ใช้ "เอ็ด" ทุกจำนวน<br />(<code>strictEt</code>)</span></th
					>
				</tr>
			</thead>
			<tbody>
				{#each samples as sample}
					{@const converted = convert(sample) as string}
					<tr
						><td class="text-end"><code>{sample}</code></td>
						<td>{converted}</td>
						<td
							>{@html displayDiff(converted, convert(sample, { roundSatangs: true }) as string)}</td
						>
						<td>{@html displayDiff(converted, convert(sample, { strictEt: true }) as string)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<footer>
		<a href="https://github.com/narze/baht.js">
			<svg
				aria-hidden="true"
				class="octicon octicon-mark-github"
				height="32"
				version="1.1"
				viewBox="0 0 16 16"
				width="32"
			>
				<path
					fill-rule="evenodd"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
			<div><b>Star me on GitHub</b></div>
		</a>
	</footer>
</main>

<style scoped>
	:global(b) {
		color: rgb(30, 135, 240);
	}
	.result {
		background-color: #d8eafc;
		color: rgb(30, 135, 240);
		padding: 2px 16px;
		border-radius: 4px;
		margin-top: 16px;
	}
	.input-number input {
		width: 100%;
		padding: 8px;
		border-radius: 4px;
	}
	.text-end {
		text-align: end;
	}
	.text-start {
		text-align: start;
	}

	.container {
		box-sizing: content-box;
		max-width: 1200px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.table-wrapper {
		overflow: auto;
	}
	.thead {
		color: rgba(128, 128, 128, 0.747);
		font-weight: 200;
	}
	@media (min-width: 1200px) {
		.container {
			padding: 40px;
			margin: 0 auto;
		}
	}
</style>
