import { AlbumGallery } from "@/components/gallery/AlbumGallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlbumType } from "@/types/common";
async function getAlbums() {
  let albums: AlbumType[] = [];
  try {
    const res = await fetch(`${process.env.API_URL}/api/albums`, {
      cache: "no-store", // Ensures fresh data on each request
    });

    if (!res.ok) throw new Error("Failed to fetch albums");
    const data = (await res.json()) as { albums: AlbumType[] };
    albums = data.albums;
  } catch (error) {
    console.log(error);    
    albums = [];
  }
  finally {
    return { albums };
  }
}

export default async function GalleryPage() {
  const { albums } = await getAlbums();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold py-2 mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple">
            Gallery
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Capturing moments of mathematical brilliance and fun.
          </p>
        </div>

        {/* Pass fetched albums to AlbumGallery */}
        <AlbumGallery albums={albums}/>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
