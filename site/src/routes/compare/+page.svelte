<script lang="js">
	import '$lib/global.css';
	import { convert } from 'baht';

	import BAHTTEXTjs from '$lib/BAHTTEXT';
	import { bahttext } from 'bahttext';
	import THBText from 'thai-baht-text';
	// import thaiBahtLib from '@to-da-moon/thai-baht-lib'; // not working
	import bahtRext from 'bahtrext';
	import { fromExcel } from '$lib/excel';

	const numbers = [
		-1,
		0,
		0.01,
		0.1,
		0.11,
		0.12,
		0.123,
		0.2,
		0.21,
		0.25,
		0.255,
		0.5,
		0.75,
		0.99,
		0.999,
		1,
		10,
		11,
		11.25,
		12,
		20,
		21,
		22,
		100,
		100.5,
		101,
		111,
		121,
		567.01,
		1000000,
		1000001,
		6321298,
		10000000,
		10034567,
		11000000,
		11000001,
		20034567,
		30034567.0,
		100000000,
		123456789.999,
		1000000000,
		1000000000000,
		1000000000001,
		1001000000000,
		1001000000001,
		1001000001001,
		123456789012345,
		987654321098765,
		Number.MAX_SAFE_INTEGER - 1 // bahttext cannot count above this and will return empty string
	];

	const libs = {
		'Baht.js': (n) => convert(n),
		'Excel / Google Sheets': (n) => fromExcel(n),
		'BAHTTEXT.js': (n) => BAHTTEXTjs(n),
		bahttext: (n) => bahttext(n),
		'thai-baht-text': (n) => THBText(n),
		// '@to-da-moon/thai-baht-lib': (n) => thaiBahtLib.bahtText(n),
		'BahtRext (Number stringified)': (n) => bahtRext.BT(String(n))
	};

	function hasSameResultAsExcel(num, expected) {
		return fromExcel(num) === expected;
	}
</script>

<main class="container">
	<h1>Compare result with other libraries</h1>

	<div class="table-wrapper">
		<table style="min-width:480px">
			<thead>
				<tr>
					<th style="width:100px;" class="text-end"><span class="thead">Amount</span></th>
					{#each Object.keys(libs) as lib}
						<th class="text-start"><span class="thead">{lib}</span></th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each numbers as num}
					<tr>
						<td class="text-end"><code>{num}</code></td>
						{#each Object.values(libs) as fn}
							{@const result = fn(num)}
							<td class:same-result={hasSameResultAsExcel(num, result)}>
								{result}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>

<style scoped>
	.same-result {
		background-color: #d8fcd8;
		color: rgb(10, 150, 10);
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
