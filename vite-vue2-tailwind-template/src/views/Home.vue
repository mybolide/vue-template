<template>
  <div class="w-24">
    <canvas ref="canvas" />
  </div>
</template>
<script>
import SmoothSignature from "@/utils/smooth-signature";
import hp from '@/assets/images/left.jpeg'
const PROPORTION = 0.37

export default {
  name: 'Home',
  mounted () {
    new SmoothSignature(this.$refs.canvas, {
      bgImage: hp,
      width: 600 * PROPORTION,
      height: 3640 * PROPORTION
    });
  },
  methods: {
    drawCanvasImage (canvas, image) { }
  },
}
</script>
