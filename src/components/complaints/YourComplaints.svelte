<script>
	import { doc, deleteDoc } from 'firebase/firestore';
	import { db } from '../../firebase/config';
	import Loading from '../Loading.svelte';
	export let problemName = '';
	export let desc = '';
	export let ward = '';
	export let department = '';
	export let status = '';
	export let phone = '';
	export let date = '';
	export let ticketNo = '';
	export let isRegen = false;
	export let email = '';
	export let area = '';
	export let address = '';
	export let contactName = '';
	export let downloadLink = '';
	export let docId = '';
	export let statusColor = '';
	console.log(docId);
	let isLoading = false;

	const handleDelete = async () => {
		isLoading = true;
		await deleteDoc(doc(db, 'Complaint-Registration', docId));
		isLoading = false;
	};
</script>

<div
	class="space-y-4 flex flex-col justify-between bg-gray-50 rounded-xl shadow-xl p-5 transition-all duration-300 hover:scale-105 cursor-pointer"
>
	<div class="space-y-4">
		<div class="flex justify-between items-center gap-5">
			<h1 class=" font-bold ">{problemName}</h1>
			<h2 class="text-sm font-bold"><span class={statusColor}>{status}</span></h2>
		</div>
		<p>
			{desc}
		</p>
	</div>
	<table class="table-auto text-xs">
		<tbody>
			<tr>
				<td class="border-b-2">Ticket No :</td>
				<td class="border-b-2">{ticketNo}</td>
			</tr>
			<tr>
				<td class="border-b-2">Department :</td>
				<td class="border-b-2">{department}</td>
			</tr>
			<tr>
				<td class="border-b-2">Ward :</td>
				<td class="border-b-2">{ward}</td>
			</tr>
			<tr>
				<td class="border-b-2">Area :</td>
				<td class="border-b-2">{area}</td>
			</tr>
			<tr>
				<td class="border-b-2">Date :</td>
				<td class="border-b-2">{date}</td>
			</tr>
			<tr>
				<td class="border-b-2">Provided Name :</td>
				<td class="border-b-2">{contactName}</td>
			</tr>
			<tr>
				<td class="border-b-2">Provided Phone :</td>
				<td class="border-b-2">{phone}</td>
			</tr>
			{#if email !== ''}
				<tr>
					<td class="border-b-2">Provided Email :</td>
					<td class="border-b-2">{email}</td>
				</tr>
			{/if}
			{#if address !== ''}
				<tr>
					<td class="border-b-2">Provided Address :</td>
					<td class="border-b-2">{address}</td>
				</tr>
			{/if}
			{#if downloadLink !== ''}
				<tr>
					<td class="border-b-2">Download Link :</td>
					<td class="border-b-2">
						<a href={downloadLink} class="text-blue-500" download>Download</a>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
	<!-- <div class="grid grid-cols-2 text-sm border rounded-xl py-5 px-2">
		<div class=" font-semibold ">
			<h4 class="border-b-2">Department :</h4>
			<h4 class="border-b-2">Ward :</h4>
			<h4 class="border-b-2">Area :</h4>
			<h4 class="border-b-2">Date :</h4>
			<h4 class="border-b-2">Provided Name :</h4>
			<h4 class="border-b-2">Provided Phone :</h4>
			{#if email !== ''}
				<h4 class="border-b-2">Provided Email :</h4>
			{/if}
			{#if address !== ''}
				<h4 class="border-b-2">Provided Address :</h4>
			{/if}
			{#if downloadLink !== ''}
				<h4 class="border-b-2">Document :</h4>
			{/if}
		</div>
		<div>
			<h4 class="border-b-2">{department}</h4>
			<h4 class="border-b-2">{ward}</h4>
			<h4 class="border-b-2">{area}</h4>
			<h4 class="border-b-2">{date}</h4>
			<h4 class="border-b-2">{contactName}</h4>
			<h4 class="border-b-2">{phone}</h4>
			<h4 class="border-b-2">{email}</h4>
			<h4 class="border-b-2">{address}</h4>
			{#if downloadLink !== ''}
				<h4 class="border-b-2">
					<a href={downloadLink} target="" class=" text-blue-500">Download</a>
				</h4>
			{/if}
		</div>
	</div> -->
	{#if isRegen}
		<div class="py-2 flex justify-center">
			<button
				id="sign-in-button"
				class="inline-block shrink-0 rounded-md border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-600 focus:outline-none focus:ring active:text-orange-500"
			>
				{#if isLoading}
					<Loading />
				{:else}
					REGENERATE
				{/if}
			</button>
		</div>
	{:else if status == 'PENDING'}
		<div class="py-2 flex justify-center">
			<button
				id="sign-in-button"
				on:click={handleDelete}
				class="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
			>
				{#if isLoading}
					<Loading />
				{:else}
					CANCEL
				{/if}
			</button>
		</div>
	{/if}
</div>
