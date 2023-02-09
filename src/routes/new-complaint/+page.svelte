<script lang="ts">
	import { prevent_default } from 'svelte/internal';
	import Loading from '../../components/Loading.svelte';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { collectionStore } from 'sveltefire';
	import { db, auth, storage } from '../../firebase/config';
	const problems = collectionStore(db, 'Problems');
	const getDepartment = async (docID: string) => {
		const department = doc(db, 'Department', docID);
		const docSnap = await getDoc(department);
		departmentName = docSnap.data()?.name;
		console.log(departmentName);
	};

	let departmentName = '';

	let groupIdOrignial = '';

	let alreadyExistingData: any = [];
	let similar_count = 0;
	const ward = collectionStore(db, 'Ward');
	let description = '';
	let complaintRegistrationDetails = {
		name: '',
		email: '',
		address: '',
		contactName: '',
		contactPhone: '',
		houseNo: ''
	};
	let file: any;
	let mainFile: any;
	let uid = auth.currentUser?.uid;
	let fileName: any;
	let DownloadUrl: any = '';
	let problemSelected: SelectSchema = {
		value: {
			deptId: '',
			deptName: '',
			problemId: ''
		},
		label: ''
	};
	let wardSelected: SelectSchema;

	interface SelectSchema {
		value: {
			deptId: string;
			deptName: string;
			problemId: string;
		};
		label: string;
	}
	import Select from 'svelte-select';
	import {
		addDoc,
		collection,
		doc,
		getDoc,
		query,
		serverTimestamp,
		where,
		getDocs,
		updateDoc
	} from 'firebase/firestore';

	let isLoading = false;

	const forceSubmit = () => {
		if (file) {
			const problemImage = ref(storage, fileName);
			uploadBytes(problemImage, mainFile)
				.then((snapshot) => {
					console.log('Uploaded a blob or file!');
				})
				.then(() => {
					getDownloadURL(ref(storage, problemImage.name))
						.then((url) => {
							DownloadUrl = url;
							console.log(DownloadUrl);
						})
						.then(() => {
							uploadData(true);
						})
						.then(() => {
							isLoading = false;
							window.location.replace('/your-complaints');
						});
				});
		} else {
			uploadData(true).then(() => {
				isLoading = false;
				window.location.replace('/your-complaints');
			});
		}
	};

	const complaintSubmit = async () => {
		isLoading = true;
		const check = query(
			collection(db, 'Complaint-Registration'),
			where('problemId', '==', problemSelected.value.problemId),
			where('wardId', '==', wardSelected.value),
			where('status', '!=', 'SOLVED')
		);
		const checkData = await getDocs(check);
		if (checkData.docs.length > 0) {
			// popup
			similar_count = checkData.docs.length;
			checkData.docs.map((doc) => {
				alreadyExistingData.push(doc.data().date.toDate().toLocaleDateString());
				groupIdOrignial = doc.data().groupId;
			});
			showPopup = true;
		} else {
			if (file) {
				const problemImage = ref(storage, fileName);
				uploadBytes(problemImage, mainFile)
					.then((snapshot) => {
						console.log('Uploaded a blob or file!');
					})
					.then(() => {
						getDownloadURL(ref(storage, problemImage.name))
							.then((url) => {
								DownloadUrl = url;
								console.log(DownloadUrl);
							})
							.then(() => {
								uploadData(false);
							})
							.then(() => {
								isLoading = false;
								window.location.replace('/your-complaints');
							});
					});
			} else {
				uploadData(false).then(() => {
					isLoading = false;
					window.location.replace('/your-complaints');
				});
			}
		}
	};

	const uploadData = async (isGroup: boolean) => {
		if (isGroup) {
			const check = query(
				collection(db, 'Complaint-Registration'),
				where('groupId', '==', groupIdOrignial),
				where('status', '!=', 'SOLVED')
			);
			const checkData = await getDocs(check);
			checkData.docs.map(async (document) => {
				await updateDoc(doc(db, 'Complaint-Registration', document.id), {
					status: 'PENDING'
				});
			});
			addDoc(collection(db, 'Complaint-Registration'), {
				problemId: problemSelected.value.problemId,
				problemName: problemSelected.label,
				deptId: problemSelected.value.deptId,
				departmentName: departmentName,
				wardId: wardSelected.value,
				wardName: wardSelected.label,
				desc: description,
				date: serverTimestamp(),
				status: 'PENDING',
				groupId: groupIdOrignial,
				isGroup: true,
				name: complaintRegistrationDetails.name,
				email: complaintRegistrationDetails.email,
				address: complaintRegistrationDetails.address,
				contactName: complaintRegistrationDetails.contactName,
				contactPhone: complaintRegistrationDetails.contactPhone,
				houseNo: complaintRegistrationDetails.houseNo,
				file: DownloadUrl,
				userId: uid
			});
		} else {
			const groupId = problemSelected.value.problemId + Math.floor(Math.random() * 1000);
			addDoc(collection(db, 'Complaint-Registration'), {
				problemId: problemSelected.value.problemId,
				problemName: problemSelected.label,
				deptId: problemSelected.value.deptId,
				departmentName: departmentName,
				wardId: wardSelected.value,
				wardName: wardSelected.label,
				desc: description,
				date: serverTimestamp(),
				status: 'PENDING',
				groupId: groupId,
				isGroup: false,
				name: complaintRegistrationDetails.name,
				email: complaintRegistrationDetails.email,
				address: complaintRegistrationDetails.address,
				contactName: complaintRegistrationDetails.contactName,
				contactPhone: complaintRegistrationDetails.contactPhone,
				houseNo: complaintRegistrationDetails.houseNo,
				file: DownloadUrl,
				userId: uid
			});
		}
	};

	const onFileSelected = (e: any) => {
		mainFile = e.target.files[0];
		fileName = mainFile.name;
		console.log(mainFile);
	};
	let showPopup = false;
</script>

<section class="max-w-6xl mx-auto relative">
	<form
		on:submit={prevent_default}
		class={`w-2/3 mx-auto bg-gray-50 shadow-xl p-10 rounded-xl my-20 transition-all duration-300 ${
			showPopup ? 'opacity-5' : 'opacity-100'
		}`}
	>
		<div class="grid grid-cols-12 gap-5">
			<h1 class="col-span-12 text-2xl font-bold py-2 border-b-2 border-gray-400">New Complaint</h1>

			<div class=" col-span-6">
				<label class="py-4" for="problem"
					>Problem <span class="text-red-500 text-lg"> * </span>
				</label>
				<Select
					items={$problems.map((data) => {
						return {
							value: {
								deptId: data.deptId,
								problemId: data.id
							},
							label: data.statement
						};
					})}
					on:change={() => getDepartment(problemSelected.value.deptId)}
					bind:value={problemSelected}
				/>
			</div>
			<div class=" col-span-6">
				<label class="py-4" for="ward">Ward <span class="text-red-500 text-lg"> * </span></label>
				<Select
					items={$ward.map((data) => {
						return {
							value: data.id,
							label: data.name
						};
					})}
					bind:value={wardSelected}
				/>
			</div>
			<div class="col-span-6">
				<label class="py-4" for="department"
					>Department <span class="text-red-500 text-lg"> * </span></label
				>
				<input
					class=" form-input rounded-lg bg-gray-100 w-full"
					name="department"
					bind:value={departmentName}
					disabled
				/>
			</div>
			<div class="col-span-6">
				<label class="py-4" for="description"
					>Description <span class="text-red-500 text-lg"> * </span></label
				>
				<textarea
					bind:value={description}
					name="description"
					id=""
					class=" form-textarea rounded-lg w-full"
				/>
			</div>
			<h1 class="col-span-12 text-lg font-semibold py-1  border-b-2 border-gray-400">
				Complaint Registation Details
			</h1>
			<div class="col-span-6">
				<label class="py-4" for="name">Name <span class="text-red-500 text-lg"> * </span></label>
				<input
					bind:value={complaintRegistrationDetails.name}
					name="name"
					type="text"
					id=""
					class=" form-textarea rounded-lg w-full"
				/>
			</div>
			<div class="col-span-6">
				<label class="py-4" for="email">Email </label>
				<input
					bind:value={complaintRegistrationDetails.email}
					name="email"
					type="email"
					id=""
					class=" form-textarea rounded-lg w-full"
				/>
			</div>
			<div class="col-span-6">
				<label class="py-4" for="address"
					>Residential Address <span class="text-red-500 text-lg"> * </span></label
				>
				<textarea
					bind:value={complaintRegistrationDetails.address}
					name="address"
					id=""
					class=" form-textarea rounded-lg w-full"
				/>
			</div>
			<div class="col-span-6">
				<label class="py-4" for="contact-name"
					>Contact Person Name <span class="text-red-500 text-lg"> * </span></label
				>
				<input
					bind:value={complaintRegistrationDetails.contactName}
					name="contact-name"
					id=""
					type="text"
					class=" form-textarea rounded-lg w-full"
				/>
			</div>
			<div class="col-span-6">
				<label class="py-4" for="contact-phone"
					>Contact Person Number <span class="text-red-500 text-lg"> * </span></label
				>
				<input
					bind:value={complaintRegistrationDetails.contactPhone}
					on:change={(e) => onFileSelected(e)}
					name="contact-phone"
					id=""
					type="tel"
					class=" form-textarea rounded-lg w-full"
				/>
			</div>
			<div class="col-span-6">
				<label class="py-4" for="house-no">Home/Flat No.</label>
				<input
					bind:value={complaintRegistrationDetails.houseNo}
					name="house-no"
					id=""
					type="tel"
					class=" form-textarea rounded-lg w-full"
				/>
			</div>
			<h1 class="col-span-12 text-lg font-semibold py-1  border-b-2 border-gray-400">
				Upload Documents/Images <span class="text-red-500 text-lg"> * </span>
			</h1>
			<div class="col-span-6">
				<input
					name="name"
					bind:value={file}
					on:change={(e) => onFileSelected(e)}
					type="file"
					id=""
					class=" form-input rounded-lg w-full"
				/>
			</div>
			<div class="col-span-12 sm:flex sm:items-center sm:gap-4">
				<button
					id="sign-in-button"
					type="submit"
					on:click={() => complaintSubmit()}
					class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
				>
					{#if isLoading}
						<Loading />
					{:else}
						SUBMIT COMPLAINT
					{/if}
				</button>
			</div>
		</div>
	</form>
	<div
		class={`${showPopup ? '' : 'hidden'} absolute top-0 bottom-0 right-0 left-0 flex items-center`}
	>
		<div class={` rounded-xl bg-white p-8 shadow-2xl max-w-5xl mx-auto `}>
			<h2 class="text-xl font-bold text-center">Simillar Complaint Already Exisits</h2>
			{#each alreadyExistingData as a}
				<div class="flex flex-col gap-4">
					<div class="flex justify-between">
						<h1>{problemSelected.label}</h1>
						<h1>{a}</h1>
					</div>
				</div>
			{/each}

			<p>Similar Problems : {similar_count}</p>
			<div class="mt-8 flex items-center justify-center text-lg">
				<!-- <button
					type="button"
					on:click={() => window.location.replace(`/complaints/${groupIdOrignial}`)}
					class="rounded bg-green-50 px-4 py-2 font-medium text-green-600"
				>
					View Complaint
				</button> -->
				<button
					type="button"
					on:click={() => forceSubmit()}
					class="ml-2 rounded bg-gray-50 px-4 py-2 font-medium text-red-600"
				>
					Submit New Complaint
				</button>
			</div>
		</div>
	</div>
</section>
