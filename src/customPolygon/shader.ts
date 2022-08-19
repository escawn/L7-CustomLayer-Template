export const frag = `
uniform float u_opacity: 1.0;
varying vec4 v_Color;

#pragma include "picking"

void main() {
  gl_FragColor = v_Color;
  gl_FragColor.a *= u_opacity;
  gl_FragColor = filterColor(gl_FragColor);
}
`;
export const vert = `
attribute vec4 a_Color;
attribute vec3 a_Position;

uniform mat4 u_ModelMatrix;
uniform mat4 u_Mvp;

uniform float u_opacity: 1.0;

varying vec4 v_Color;

#pragma include "projection"
#pragma include "picking"

void main() {

  v_Color = a_Color;
  vec4 project_pos = project_position(vec4(a_Position, 1.0));

  if(u_CoordinateSystem == COORDINATE_SYSTEM_P20_2) { // gaode2.x
    gl_Position = u_Mvp * (vec4(project_pos.xyz, 1.0));
  } else {
    gl_Position = project_common_position_to_clipspace(vec4(project_pos.xyz, 1.0));
  }

  setPickingColor(a_PickingColor);
}
`;
