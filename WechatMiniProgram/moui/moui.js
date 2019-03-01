import _init from "moui__init__.js";
const Base64 = require("base64.js");
const color_b = {
  bg: Base64.BASE64.encoder(_init.bg_color.replace("#", "")),
  theme: Base64.BASE64.encoder(_init.theme_color.replace("#", ""))
};
const svg = {
  pre: "data:image/svg+xml;base64,",
  progressing: ["PHN2ZyB2aWV3Qm94PScwIDAgMTIwIDEyMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48Zz48Y2lyY2xlIGN4PSc2MCcgY3k9JzYwJyByPSc1MCcgc3Ryb2tlPScjZWVlJyBzdHJva2Utd2lkdGg9JzE0JyBmaWxsPScj" + color_b.bg + "Jy8+PGNpcmNsZSBjeD0nNjAnIGN5PSc2MCcgcj0nNTAnIHN0cm9rZS13aWR0aD0nMTQnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlPScj" + color_b.theme + "JyAgc3Ryb2tlLWRhc2hhcnJheT0n", "LDMyMCcgZmlsbD0nbm9uZScgdHJhbnNmb3JtPSdyb3RhdGUo", "IDYwIDYwKScgLz48L2c+PC9zdmc+"],
  loading: "PHN2ZyB2aWV3Qm94PScwIDAgMTIwIDEyMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48Zz48Y2lyY2xlIGN4PSc2MCcgY3k9JzYwJyBzdHJva2U9JyNlZWUnIHN0cm9rZS13aWR0aD0nMTQnICBmaWxsPScj" + color_b.bg + "JyByPSc1MCcvPjxjaXJjbGUgY3g9JzYwJyBjeT0nNjAnIHI9JzUwJyAgc3Ryb2tlPScj" + color_b.theme + "JyBzdHJva2Utd2lkdGg9JzE0JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1kYXNoYXJyYXk9JzIwMCAxMDAnIGZpbGw9J25vbmUnPjxhbmltYXRlIGlkPSdhJyBhdHRyaWJ1dGVOYW1lPSdzdHJva2UtZGFzaGFycmF5JyBiZWdpbj0nMHM7Yi5lbmQnIGR1cj0nMS4zcycgdmFsdWVzPScwIDMwMDsyMDAgMTAwJy8+PGFuaW1hdGUgaWQ9J2InIGF0dHJpYnV0ZU5hbWU9J3N0cm9rZS1kYXNoYXJyYXknIGJlZ2luPSdhLmVuZCcgZHVyPScxLjNzJyB2YWx1ZXM9JzIwMCAxMDA7MCAzMDAnLz48L2NpcmNsZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSd0cmFuc2Zvcm0nIGJlZ2luPScwcztiLmVuZCcgZHVyPScxLjMnIHR5cGU9J3JvdGF0ZScgdmFsdWVzPScwIDYwIDYwOzM2MCA2MCA2MCcvPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9J3RyYW5zZm9ybScgYmVnaW49J2EuZW5kJyBkdXI9JzEuM3MnIHR5cGU9J3JvdGF0ZScgdmFsdWVzPScwIDYwIDYwOzcyMCA2MCA2MCcvPjwvZz48L3N2Zz4="
};
function thisProgressing({ progress, imageVar }) {
  this.setData({
    [imageVar]: svg.pre + svg.progressing[0] + Base64.BASE64.encoder((0 + progress * 3.15).toPrecision(5).toString()) + svg.progressing[1] + Base64.BASE64.encoder((448 - progress * 1.8).toPrecision(5).toString()) + svg.progressing[2]
  })
}

module.exports = {
  svg: {
    progressing: svg.pre + svg.progressing[0] + "MDAw" + svg.progressing[1] + "NDQ4" + svg.progressing[2],
    loading: svg.pre + svg.loading
  },
  thisProgressing: thisProgressing
}