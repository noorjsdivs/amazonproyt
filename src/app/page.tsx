import Banner from "@/components/Banner";
import Products from "@/components/Products";

const getData = async () => {
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  if (!res?.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default async function Home() {
  const productData = await getData();
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productData={productData} />
        </div>
      </div>
    </main>
  );
}
