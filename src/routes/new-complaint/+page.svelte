<script>
	import { prevent_default } from 'svelte/internal';
    import { docStore, collectionStore } from 'sveltefire';
    import { db } from '../../firebase/config';
    const problems = collectionStore(db, 'Problems');
	import Select from 'svelte-select';
</script>

<section class="max-w-6xl mx-auto">
	<form
		on:submit={prevent_default}
		class="w-2/3 mx-auto bg-gray-50 shadow-xl p-10 rounded-xl my-20"
	>
		<div class="grid grid-cols-12 gap-5">
			<h1 class="col-span-12 text-2xl font-bold py-2 border-b-2 border-gray-400">New Complaint</h1>

			<div class=" col-span-6">
				<label class="py-4" for="problem"
					>Problem <span class="text-red-500 text-lg"> * </span>
				</label>
				<Select items={collection} />
			</div>
			<div class=" col-span-6">
				<label class="py-4" for="ward">Ward <span class="text-red-500 text-lg"> * </span></label>
				<Select items={collection} />
			</div>
			<div class="col-span-12">
				<label class="py-4" for="description"
					>Description <span class="text-red-500 text-lg"> * </span></label
				>
				<textarea name="description" id="" class=" form-textarea rounded-lg w-full" />
			</div>
			<h1 class="col-span-12 text-lg font-semibold py-1  border-b-2 border-gray-400">
				Complaint Registation Details
			</h1>
			<div class="col-span-6">
				<label class="py-4" for="name">Name <span class="text-red-500 text-lg"> * </span></label>
				<input name="name" type="text" id="" class=" form-textarea rounded-lg w-full" />
			</div>
			<div class="col-span-6">
				<label class="py-4" for="email">Email </label>
				<input name="email" type="email" id="" class=" form-textarea rounded-lg w-full" />
			</div>
			<div class="col-span-6">
				<label class="py-4" for="address"
					>Residential Address <span class="text-red-500 text-lg"> * </span></label
				>
				<textarea name="address" id="" class=" form-textarea rounded-lg w-full" />
			</div>
			<div class="col-span-6">
				<label class="py-4" for="contact-name"
					>Contact Person Name <span class="text-red-500 text-lg"> * </span></label
				>
				<input name="contact-name" id="" type="text" class=" form-textarea rounded-lg w-full" />
			</div>
			<div class="col-span-6">
				<label class="py-4" for="contact-phone"
					>Contact Person Number <span class="text-red-500 text-lg"> * </span></label
				>
				<input name="contact-phone" id="" type="tel" class=" form-textarea rounded-lg w-full" />
			</div>
			<div class="col-span-6">
				<label class="py-4" for="house-no"
					>Home/Flat No. <span class="text-red-500 text-lg"> * </span></label
				>
				<input name="house-no" id="" type="tel" class=" form-textarea rounded-lg w-full" />
			</div>
			<h1 class="col-span-12 text-lg font-semibold py-1  border-b-2 border-gray-400">
				Upload Documents/Images <span class="text-red-500 text-lg"> * </span>
			</h1>
			<div class="col-span-6">
				<input name="name" type="file" id="" class=" form-input rounded-lg w-full" />
			</div>
		</div>
	</form>
</section>
