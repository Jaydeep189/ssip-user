<script>
	import AMCBuilding from '../../assets/amc_building.webp';
</script>

<section id="about">
	<div class="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
			<div class="relative h-64 pt-10 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
				<img
					alt="AMC building"
					src={AMCBuilding}
					class="absolute inset-0 h-full w-full object-cover"
				/>
			</div>

			<div class="lg:py-24">
				<h2 class="text-2xl font-bold sm:text-4xl">
					The Complaint and Decision Making System by AMC
				</h2>

				<p class="mt-6 text-gray-500">
					This system is designed for the people of Ahmedabad, to solve their complaints in a very
					efficient manner with the help of technology. The process of resolving complaints is very
					slow due to many reasons one of them being the complaint not reaching the right authority
					in time, this system solves that problem by directly posting people's complaints to the
					right authority in time.
				</p>

				<a
					href="/#"
					class="mt-8 inline-flex items-center rounded-lg transition-transform hover:scale-110 duration-300 border border-indigo-500 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
				>
					<span class="text-sm font-bold"> Get Started </span>

					<svg
						class="ml-3 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>
