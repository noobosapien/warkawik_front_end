import Hero from "@/components/Home/Hero";
import Prompt from "@/components/Home/Prompt";
import Layout from "@/components/Nav/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <Hero />
        <Prompt />
      </Layout>
    </>
  );
}
