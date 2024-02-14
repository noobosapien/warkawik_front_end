import React, { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "../../../utils/Theme";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";
import { Warkawik } from "@/utils/WarkawikContext";

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

  gl.deleteProgram(program);
}

function setVertexData(gl, program) {
  if (program) {
    gl.useProgram(program);
    positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var positions = [-1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  }
}

function draw() {
  requestAnimationFrame(draw);

  if (program) {
    var resolutionUniformLocation = gl.getUniformLocation(
      program,
      "u_resolution"
    );
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    var timeUniform = gl.getUniformLocation(program, "u_time");
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
}

export default function Canvas() {
  const { state, dispatch } = useContext(Theme);
  const { state: shaderState, dispatch: shaderDispatch } = useContext(Warkawik);

  const [dimension, setDimension] = useState(300);
  const [fragShader, setFragShader] = useState("");

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
    setFragShader(shaderState.shader);
  }, [shaderState]);

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
    if (fragShader) {
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
    }
  }, [state, canvasRef, fragShader]);

  useEffect(() => {
    if (fragShader) {
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

      var fragmentShaderSource = fragShader;

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
    }
  }, [canvasRef, fragShader]);

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
