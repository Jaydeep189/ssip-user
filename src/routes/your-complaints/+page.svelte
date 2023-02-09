<script lang="ts">
	import { collection, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { FirebaseApp, User, Collection, userStore } from 'sveltefire';
	import YourComplaints from '../../components/complaints/YourComplaints.svelte';
	import Loading from '../../components/Loading.svelte';
	import { db, auth } from '../../firebase/config';
</script>

<section class="max-w-6xl mx-auto">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-5 my-20">
		<FirebaseApp {auth} firestore={db}>
			<User let:user>
				<Collection
					ref={query(collection(db, 'Complaint-Registration'), where('userId', '==', user.uid))}
					let:data={com}
				>
					<div slot="loading">
						<Loading />
					</div>
					{#each com as c}
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
					{/each}
				</Collection>
			</User>
		</FirebaseApp>
	</div>
</section>
