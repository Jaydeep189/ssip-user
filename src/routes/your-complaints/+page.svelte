<script lang="ts">
	import { collection, orderBy, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { FirebaseApp, User, Collection, userStore } from 'sveltefire';
	import YourComplaints from '../../components/complaints/YourComplaints.svelte';
	import Loading from '../../components/Loading.svelte';
	import { db, auth } from '../../firebase/config';
</script>

<section class="max-w-6xl mx-auto my-20">
	<FirebaseApp {auth} firestore={db}>
		<User let:user>
			<Collection
				ref={query(
					collection(db, 'Complaint-Registration'),
					where('userId', '==', user.uid),
					orderBy('date')
				)}
				let:data={com}
			>
				<div slot="loading">
					<Loading />
				</div>
				<h1 class="text-3xl font-bold py-10">Pending Complaints</h1>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					{#each com.reverse() as c}
						{#if c.status !== 'SOLVED'}
							<YourComplaints
								area={c.area}
								problemName={c.problemName}
								address={c.address}
								date={c.date.toDate().toDateString()}
								ward={c.wardName}
								department={c.departmentName}
								desc={c.desc}
								downloadLink={c.file}
								status={c.status}
								contactName={c.contactName}
								email={c.email}
								docId={c.id}
								phone={c.contactPhone}
							/>
						{/if}
					{/each}
				</div>
				<h1 class="text-3xl font-bold mt-12 pt-12 pb-6 border-t-2 border-gray-400">
					Solved Complaints
				</h1>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-5 ">
					{#each com.reverse() as c}
						{#if c.status == 'SOLVED'}
							<YourComplaints
								problemName={c.problemName}
								address={c.address}
								ward={c.wardName}
								department={c.departmentName}
								desc={c.desc}
								downloadLink={c.file}
								status={c.status}
								contactName={c.contactName}
								email={c.email}
								docId={c.id}
								phone={c.contactPhone}
							/>
						{/if}
					{/each}
				</div>
			</Collection>
		</User>
	</FirebaseApp>
</section>
