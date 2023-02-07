<script lang="ts">
	import { browser } from '$app/environment';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
	import type { ApplicationVerifier } from 'firebase/auth';
	import Loading from '../../../components/Loading.svelte';
	import { auth, db } from '../../../firebase/config';
	import { onMount, prevent_default } from 'svelte/internal';
	import Login from '../../../functions/auth/Login';
	import { userStore } from 'sveltefire';
	const user = userStore(auth);
	auth.useDeviceLanguage();
	let appVerifier: ApplicationVerifier;
	onMount(() => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			'sign-in-button',
			{
				size: 'invisible',
				callback: (response: any) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					console.log(response);
					sendOTP();
					handleSignIn();
				}
			},
			auth
		);
		appVerifier = window.recaptchaVerifier;
	});
	const sendOTP = () => {
		console.log(phoneNumber);
		isLoading = true;
		signInWithPhoneNumber(auth, '+91' + phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				console.log(window.confirmationResult);
				isCode = true;
				isLoading = false;
				// ...
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleSignIn = async () => {
		isLoading = true;
		window.confirmationResult.confirm(code).then((result: any) => {
			const user = result.user;
			console.log(user.uid);
			Login(user.uid, name);
			isLoading = false;
			window.location.replace('/');
		});
		isLoading = false;
	};
	let phoneNumber = '';
	let code = '';
	let isLoading = false;
	let isCode = false;
	let name = '';
</script>

<section class="max-w-6xl mx-auto">
	<div class="flex justify-center my-24 items-center">
		<!-- <form class="bg-white shadow-xl rounded-lg grid grid-rows-1" action="">
			{#if isCode}
				<label class="text-xl font-outfit font-medium" for="code">Enter OTP Code</label>
				<input name="code" type="text" class="form-input rounded-lg w-96" bind:value={code} />
			{:else}
				<label class="text-xl font-outfit font-medium" for="phone">Enter Phone Number</label>
				<input name="phone" type="text" class="form-input rounded-lg" bind:value={phoneNumber} />
			{/if}

			<button id="sign-in-button" on:click={() => (isCode ? handleSignIn() : sendOTP())}
				>Send Code</button
			>
		</form> -->
		<form
			on:submit={prevent_default}
			action="#"
			class="mt-8 grid grid-cols-6 gap-6 bg-gray-50 shadow-xl p-10 rounded-lg"
		>
			<h1 class="text-2xl font-medium text-indigo-500 col-span-12">SignIn</h1>
			<div class="col-span-12 pt-4 pb-2">
				<label for="name" class="block text-sm font-medium text-gray-700"> Full Name </label>
				<input
					type="text"
					name="name"
					bind:value={name}
					class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
				/>
			</div>
			{#if isCode}
				<div class="col-span-12">
					<label for="code" class="block text-sm font-medium text-gray-700"> Enter Code </label>

					<input
						type="text"
						name="code"
						bind:value={code}
						class="mt-1 w-full  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
					/>
				</div>
			{:else}
				<div class="col-span-12">
					<label for="phone" class="block text-sm font-medium text-gray-700"> Phone Number </label>
					<input
						type="text"
						name="phone"
						maxlength="10"
						minlength="10"
						bind:value={phoneNumber}
						class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
					/>
				</div>
			{/if}

			<div class="col-span-12 sm:flex sm:items-center sm:gap-4">
				<button
					id="sign-in-button"
					type="submit"
					on:click={() => (isCode ? handleSignIn() : sendOTP())}
					class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
				>
					{#if isLoading}
						<Loading />
					{:else}
						{isCode ? 'CONFIRM OTP' : 'GET OTP'}
					{/if}
				</button>

				<p class="mt-4 text-sm text-gray-500 sm:mt-0">
					Already have an account?
					<a href="/#" class="text-gray-700 underline">Log in</a>.
				</p>
			</div>
		</form>
	</div>
</section>
