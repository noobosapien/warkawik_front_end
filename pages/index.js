import Console from "@/components/Home/Console";
import Hero from "@/components/Home/Hero";
import Prompt from "@/components/Home/Prompt";
import ShaderArea from "@/components/Home/ShaderArea/ShaderArea";
import Layout from "@/components/Nav/Layout";
import useWarkawik from "@/helpers/useWarkawik";
import { Warkawik } from "@/utils/WarkawikContext";
import { useContext, useEffect } from "react";

export default function Home() {
  const { state, dispatch } = useContext(Warkawik);

  const { messageHistory, sendMessage } = useWarkawik();

  useEffect(() => {
    dispatch({
      type: "SHADER",
      payload: `
      precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec3 iBG;
      
              void main()	{
          vec2 p = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
          float tau = 3.1415926535*2.0;
          float a = atan(p.x,p.y);
          float r = length(p)*1.0;
          vec2 uv = vec2(a/tau,r);
      
        //get the color
        float xCol = (uv.x - (u_time / 3.0)) * 3.0;
        xCol = mod(xCol, 3.0);
        vec3 horColour = vec3(0.25, 0.25, 0.25);
      
        if (xCol < 1.0) {
      
          horColour.r += 1.0 - xCol;
          horColour.g += xCol;
        }
        else if (xCol < 2.0) {
      
          xCol -= 1.0;
          horColour.g += 1.0 - xCol;
          horColour.b += xCol;
        }
        else {
      
          xCol -= 2.0;
          horColour.b += 1.0 - xCol;
          horColour.r += xCol;
        }
      
        // draw color beam
        uv = (2.0 * uv) - 1.0;
        float beamWidth = (0.7+0.5*cos(uv.x*10.0*tau*0.15*clamp(floor(5.0 + 10.0*cos(u_time)), 0.0, 10.0))) * abs(1.0 / (30.0 * uv.y));
        vec3 horBeam = vec3(beamWidth);
      
        if(horBeam.r < 0.5 && horBeam.g < 0.5 && horBeam.b < 0.5){
          horBeam = iBG;
          horColour = vec3(1.0);
        }
      
        gl_FragColor = vec4((( horBeam) * horColour), 1.0);
        
              }
      
      `,
    });
  }, []);

  return (
    <>
      <Layout>
        <Hero />
        <Prompt sendMessage={sendMessage} messageHistory={messageHistory} />
        <Console messageHistory={messageHistory} />
        <ShaderArea />
      </Layout>
    </>
  );
}
