import React, { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "../../../utils/Theme";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";

var gl, program, positionBuffer, startTime, color;
var positionAttributeLocation;

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function setVertexData(gl, program) {
  gl.useProgram(program);
  positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [-1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

function draw() {
  requestAnimationFrame(draw);

  var resolutionUniformLocation = gl.getUniformLocation(program, "iResolution");
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  var timeUniform = gl.getUniformLocation(program, "iTime");
  var now = new Date();
  var time = (now - startTime) / 1000;
  gl.uniform1f(timeUniform, time);

  var bgUniform = gl.getUniformLocation(program, "iBG");
  gl.uniform3f(bgUniform, color[0], color[1], color[2]);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.enableVertexAttribArray(positionAttributeLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  // draw
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

export default function Canvas() {
  const { state, dispatch } = useContext(Theme);
  const [dimension, setDimension] = useState(300);
  var canvasRef = useRef(null);

  var canvas;

  const fullConfig = resolveConfig(tailwindConfig);

  const resize = () => {
    if (window?.innerWidth < Number(fullConfig.theme.screens.lg.slice(0, -2))) {
      setDimension(300);
    } else {
      setDimension(800);
    }
  };

  useEffect(() => {
    startTime = new Date();

    if (window?.innerWidth < Number(fullConfig.theme.screens.lg.slice(0, -2))) {
      setDimension(300);
    } else {
      setDimension(800);
    }

    window?.addEventListener("resize", resize);
  }, []);

  useEffect(() => {
    color = [];

    if (state.darkMode.dark) {
      color[0] = 51 / 256;
      color[1] = 65 / 256;
      color[2] = 85 / 256;
    } else {
      color[0] = 226 / 256;
      color[1] = 232 / 256;
      color[2] = 240 / 256;
    }

    canvas = canvasRef.current;
    if (!canvas) return;

    if (gl) {
      let bgUniform = gl.getUniformLocation(program, "iBG");
      gl.uniform3f(bgUniform, color[0], color[1], color[2]);
    }
  }, [state, canvasRef]);

  useEffect(() => {
    canvas = canvasRef.current;
    if (!canvas) return;

    gl = canvas.getContext("webgl");
    if (!gl) {
      return;
    }

    // Get the strings for our GLSL shaders
    var vertexShaderSource = `
    precision highp float;
    attribute vec2 a_position;
    
    void main()
    {
        vec4 pos=vec4(a_position,0.,1.);
        gl_Position=pos;
        
    }`;

    var fragmentShaderSource = `

    precision highp float;
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec3 iBG;
  
          void main()	{
      vec2 p = (2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;
      float tau = 3.1415926535*2.0;
      float a = atan(p.x,p.y);
      float r = length(p)*1.0;
      vec2 uv = vec2(a/tau,r);
  
    //get the color
    float xCol = (uv.x - (iTime / 3.0)) * 3.0;
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
    float beamWidth = (0.7+0.5*cos(uv.x*10.0*tau*0.15*clamp(floor(5.0 + 10.0*cos(iTime)), 0.0, 10.0))) * abs(1.0 / (30.0 * uv.y));
    vec3 horBeam = vec3(beamWidth);
  
    if(horBeam.r < 0.5 && horBeam.g < 0.5 && horBeam.b < 0.5){
      horBeam = iBG;
      horColour = vec3(1.0);
    }
  
    gl_FragColor = vec4((( horBeam) * horColour), 1.0);
    
          }
  `;

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    program = createProgram(gl, vertexShader, fragmentShader);

    setVertexData(gl, program);

    gl.canvas.width = gl.canvas.clientWidth;
    gl.canvas.height = gl.canvas.clientHeight;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    draw();
  }, [canvasRef]);

  return (
    <>
      <div>
        <canvas
          ref={canvasRef}
          style={{ width: dimension, height: dimension }}
          className="rounded"
          id="c"
        ></canvas>
      </div>
    </>
  );
}
