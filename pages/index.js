import Console from "@/components/Home/Console";
import Hero from "@/components/Home/Hero";
import Prompt from "@/components/Home/Prompt";
import ShaderArea from "@/components/Home/ShaderArea/ShaderArea";
import Layout from "@/components/Nav/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <Hero />
        <Prompt />
        <ShaderArea />
        <Console />
      </Layout>
    </>
  );
}
