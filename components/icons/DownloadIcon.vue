<template>
    <svg
          class="svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />

          <g id="Complete">
            <g id="download">
              <g>
                <path
                  d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7"
                  fill="none"
                  stroke="#F5F1ED"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />

                <g>
                  <polyline
                    id="Right-2"
                    data-name="Right"
                    fill="none"
                    points="7.9 12.3 12 16.3 16.1 12.3"
                    stroke="#F5F1ED"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />

                  <line
                    fill="none"
                    stroke="#F5F1ED"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="12"
                    x2="12"
                    y1="2.7"
                    y2="14.2"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
</template>


<style scoped>
 line{
     transition: all 0.2s ease-in-out;
 }
 polyline{
     transition: all 0.2s ease-in-out;
 }
 path{
     transition: all 0.2s ease-in-out;
 }
 svg:hover path, svg:hover polyline, svg:hover line {
     stroke:#344966;
 }
</style>