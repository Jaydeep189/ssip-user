<script>
	import BannerImage from '../../assets/banner-image.png';
</script>

<section id="banner" class="max-w-6xl mx-auto flex justify-between flex-wrap lg:flex-nowrap pt-10">
	<div class="lg:basis-6/12 basis-full gsap-hero-image sm:pt-16 pt-5">
		<h1 class="lg:text-5xl text-2xl lg:text-left text-center font-bold pl-5 pt-5">
			File your Complaint Get it resolved by
			<span class="text-indigo-500">AMC</span>
		</h1>
		<p
			class="font-medium lg:text-lg text-xs lg:text-left text-center lg:mx-0 mx-auto w-2/3 lg:pl-5 lg:pt-8 pt-3"
		>
			You can file your complaint from your smartphone, desktop or laptop! Just register into the
			portal to file your complaint
		</p>
		<div
			class="flex lg:text-base text-xs lg:pt-8 pt-4 lg:pl-10 lg:justify-start justify-center lg:gap-10 gap-6"
		>
			<button
				type="button"
				title="Register"
				class="bg-indigo-500 rounded-xl transition-transform hover:scale-110 duration-500"
			>
				<span class="font-bold text-white p-5"> File Complaint </span>
			</button>
			<a
				href="/#"
				title="know more"
				class="transition-transform hover:scale-110 duration-500 text-indigo-500 hover:underline underline-offset-4 decoration-indigo-400 font-semibold p-2 cursor-pointer"
			>
				Learn More
			</a>
		</div>
	</div>
	<div class="relative gsap-hero-text basis-full lg:basis-5/12 pt-10 sm-pt-0">
		<div class="flex justify-center">
			<img
				src={BannerImage}
				alt="AMC Banner"
				class="transition-transform hover:scale-105 duration-500 sm:hidden h-56 center"
				draggable="false"
			/>
		</div>
		<img
			src={BannerImage}
			alt="AMC Banner"
			class="transition-transform hover:scale-105 duration-500 hidden sm:block"
			draggable="false"
		/>
	</div>
</section>
