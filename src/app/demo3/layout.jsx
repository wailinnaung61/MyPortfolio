import BackToTop from "./_components/BackToTop";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function Demo2Layout({ children }) {
	return (
		<div className="wrapper relative min-h-screen w-full bg-grey">
			<Header />
			<main className="page-content relative bg-grey bg-opacity-95">
				<div className="bglines fixed left-0 top-0 z-20 flex h-screen w-full justify-around">
					<span className="border-r border-white border-opacity-5"></span>
					<span className="border-r border-white border-opacity-5"></span>
					<span className="border-r border-white border-opacity-5"></span>
					<span className="border-r border-white border-opacity-5"></span>
					<span className="border-r border-white border-opacity-5"></span>
				</div>
				<div className="sitedata relative z-30 min-h-screen">{children}</div>
			</main>
			<Footer />
			<BackToTop />
		</div>
	);
}
