<script>
	import { userStore } from 'sveltefire';
	import AMC from '../assets/amc_logo.jpg';
	import { auth } from '../firebase/config';
	const user = userStore(auth);
	const handleSignOut = () => {
		auth.signOut();
		console.log(user);
		// window.location.reload();
	};
	let isMobileNav = false;
</script>

<header class="bg-white mt-10 font-outfit">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="flex items-center justify-center md:gap-5 gap-2">
				<img src={AMC} class="sm:h-24 h-14" alt="" />
				<h1 class="font-bold sm:text-5xl text-3xl">AMC</h1>
			</a>

			<div class="md:flex md:items-center md:gap-12">
				<nav class="hidden md:block" aria-labelledby="header-navigation">
					<ul class="flex items-center font-semibold gap-6 text-lg">
						{#if $user}
							<li>
								<a class="text-gray-500 transition hover:text-black" href="/#about"> Home </a>
							</li>
							<li>
								<a class="text-gray-500 transition hover:text-black" href="/your-complaints">
									Your Complaints
								</a>
							</li>

							<li>
								<a class="text-gray-500 transition hover:text-black" href="/new-complaint">
									New Complaint
								</a>
							</li>

							<li>
								<a class="text-gray-500 transition hover:text-black" href="/complaints">
									Complaints
								</a>
							</li>
							<li>
								<a class="text-gray-500 transition hover:text-black" href="/#contact"> Support </a>
							</li>
						{:else}
							<li>
								<a class="text-gray-500 transition hover:text-black" href="/"> Home </a>
							</li>

							<li>
								<a class="text-gray-500 transition hover:text-black" href="/#about"> About </a>
							</li>

							<li>
								<a class="text-gray-500 transition hover:text-black" href="/#process"> Process </a>
							</li>

							<li>
								<a class="text-gray-500 transition hover:text-black" href="/#contact"> Contact </a>
							</li>
						{/if}
					</ul>
				</nav>

				{#if $user}
					<div class="flex items-center gap-4">
						<div class="sm:flex sm:gap-4">
							<div class="hidden sm:flex">
								<button
									on:click={() => handleSignOut()}
									class="transition-transform hover:scale-105 duration-500 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-bold text-white"
								>
									Logout
								</button>
							</div>
						</div>

						<div class="block md:hidden">
							<button
								on:click={() => {
									isMobileNav = !isMobileNav;
								}}
								title="some"
								class="rounded bg-gray-100 p-2 text-gray-500 transition hover:text-gray-500/75"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				{:else}
					<div class="flex items-center gap-4">
						<div class="sm:flex sm:gap-4">
							<a
								class="transition-transform hover:scale-105 duration-500 rounded-md hover:bg-indigo-700 bg-indigo-500 px-5 py-2.5 text-sm font-bold text-white shadow"
								href="/auth/login"
							>
								Login
							</a>

							<div class="hidden sm:flex">
								<a
									class="transition-transform hover:scale-105 duration-500 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-bold text-white"
									href="/auth/register"
								>
									Register
								</a>
							</div>
						</div>

						<div class="block md:hidden">
							<button
								on:click={() => {
									isMobileNav = !isMobileNav;
								}}
								title="some"
								class="rounded bg-gray-100 p-2 text-gray-500 transition hover:text-gray-500/75"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<section
		id="mobile-nav"
		class={`fixed inset-y-0 right-0 z-50 flex ${
			isMobileNav ? 'translate-x-0' : 'translate-x-full'
		} transition-all duration-300`}
	>
		<div class="w-56 max-w-sm">
			<div class="flex h-full flex-col divide-y divide-gray-200 bg-gray-50">
				<div class="overflow-y-scroll">
					<header class="flex h-16 mt-4 items-center justify-between pl-6">
						<a href="/" class="text-lg font-semibold text-indigo-500 uppercase tracking-widest">
							<img src={AMC} class="h-14" alt="" />
						</a>

						<button
							on:click={() => {
								isMobileNav = !isMobileNav;
							}}
							aria-label="Close menu"
							class="h-16 w-16 border-l border-gray-200"
							type="button"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mx-auto h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</header>

					<nav
						class="flex flex-col divide-y divide-gray-200 mt-10 border-b border-gray-200 text-xl font-medium text-gray-500"
					>
						<a href="#banner" class="px-6 py-3"> Home </a>
						<a href="#about" class="px-6 py-3"> About </a>
						<a href="#process" class="px-6 py-3"> Process </a>
						<a href="#contact" class="px-6 py-3"> Contact </a>
						<div class="flex justify-center mt-20" />
						<a
							class="mx-5  text-center border-t-0 border-b-0 transition-transform hover:scale-105 duration-500 rounded-md bg-gray-900 px-5 py-2.5 text-lg font-bold text-white"
							href="/auth/register"
						>
							Register
						</a>
					</nav>
				</div>
			</div>
		</div>
	</section>
</header>
