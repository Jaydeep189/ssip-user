<script>
	import '../app.css';
	import Footer from '../layout/Footer.svelte';
	import Navbar from '../layout/Navbar.svelte';
</script>

<main>
	<Navbar />
	<slot />
	<Footer />
</main>
