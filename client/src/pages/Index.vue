<template>
  <q-page class>
    <div id="q-app">
      <div class="q-pa-md" style="max-width:350px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="track"
            label="Your track"
            hint="Burial"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          >
            <template v-slot:error>Please use minimum 3 characters.</template>
          </q-input>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-form>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <div v-for="(item,index) in elements" :key="index" class="caption">
            <q-card class="my-card">
              <span v-for="(foo,index) in item.album.artists" :key="index">
                <h4>{{foo.name}}</h4>
                <div v-for="(bar,index) in elements" :key="index" class="q-pa-md">
                  <div v-for="(img,index) in bar.album.images" :key="index">
                    <q-img v-if="img.width==640" :src="img.url">
                      <div class="absolute-bottom">
                        <div class="text-h6">
                          <a :href="foo.external_urls.spotify">
                            <q-btn color="amber" glossy label="Listen" />
                          </a>
                        </div>
                        <div class="text-subtitle2">
                          <q-btn @click="Onsearchartist(foo.id)" flat>Search</q-btn>
                        </div>
                      </div>
                    </q-img>
                  </div>
                </div>
              </span>
            </q-card>
          </div>
          <div class="col">
            <div v-for="(bar,index) in besttracks" :key="index" class="q-pa-md">
              <q-card class="my-card">
                <div v-for="(img,index) in bar.album.images" :key="index">
                  <q-parallax v-if="img.width==640" :src="img.url" :height="150" />
                </div>
                <q-card-section v-for="(track,index) in bar.album.artists" :key="index">
                  <div class="text-h6">{{track.name}}</div>
                  <div class="text-subtitle2">
                    {{bar.name}}
                    <a :href="track.external_urls.spotify">
                      <q-btn color="amber" glossy label="Listen" />
                    </a>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <!-- <template v-if="elements.length">

        <q-infinite-scroll @load="onLoad" :offset="250">

          <div v-for="(item,index) in elements" :key="index" class="caption">
            <span v-for="(foo,index) in item.album.artists" :key="index">
              <h4>{{foo.name}}</h4>
            <div v-for="(bar,index) in elements" :key="index" class="q-pa-md">
       
          <div v-for="(img,index) in bar.album.images"
            :key="index" >
          <q-parallax
            v-if="img.width==640"
            :src="img.url"
            :height="150"
          />
          </div>
            </div>
            


            <a :href="foo.external_urls.spotify">
                <q-btn color="amber" glossy label="Listen" />
              </a>

              <q-btn @click="Onsearchartist(foo.id)" flat>Search</q-btn>


            </span>
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </template>-->
    </div>
  </q-page>
</template>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      track: null,
      // age: null,

      accept: false,
      elements: [],
      besttracks: []
    };
  },
  methods: {
    onLoad(index, done) {
      setTimeout(() => {
        if (this.elements) {
          this.elements.push({}, {}, {}, {}, {}, {}, {});
          done();
        }
      }, 12200);
    },
    onSubmit() {
      async function getSpotify(inputtracks) {
        // Default options are marked with *

        const response = await fetch(
          "https://mysterious-taiga-28480.herokuapp.com/search?" +
            "track=" +
            inputtracks,
          {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              // 'Content-Type': 'application/json'
              "Content-Type": "application/x-www-form-urlencoded"
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            body: "track=" + inputtracks // body data type must match "Content-Type" header
          }
        );
        // this.isLoading = true
        return await response.json(); // parses JSON response into native JavaScript objects
      }

      getSpotify(this.track).then(data => {
        window.console.log(data);
        this.elements = data.tracks.items;
        // this.info3=data // JSON data parsed by `response.json()` call
      });
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    Onsearchartist(id) {
      async function getSpotifyTracksTop(id) {
        // Default options are marked with *

        const response = await fetch(
          "https://mysterious-taiga-28480.herokuapp.com/searchArtist?" +
            "id=" +
            id,
          {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              // 'Content-Type': 'application/json'
              "Content-Type": "application/x-www-form-urlencoded"
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            body: "id=" + id // body data type must match "Content-Type" header
          }
        );
        // this.isLoading = true
        return await response.json(); // parses JSON response into native JavaScript objects
      }

      getSpotifyTracksTop(id).then(data => {
        window.console.log(data);
        this.elements = [];
        this.besttracks = data.tracks;
        // this.info3=data // JSON data parsed by `response.json()` call
      });
    },
    onReset() {
      this.elements = [];
      this.besttracks = [];
      this.track = "";
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
