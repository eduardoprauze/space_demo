      (function () {

          var webglEl = document.getElementById('webgl');

          var width  = window.innerWidth,
              height = window.innerHeight;

          var scene = new THREE.Scene();

          var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
          camera.position.z = 1;

          var renderer = new THREE.WebGLRenderer();
          renderer.setSize(width, height);

          scene.add(new THREE.AmbientLight(0x333333));

          var light = new THREE.DirectionalLight(0xffffff, 1);
          light.position.set(5,3,5);
          scene.add(light);

          // PLANET 1
          var radius   = 0.5,
              segments = 32,
              rotation = 6;
          var planet = createPlanet1(radius, segments);
          planet.rotation.y = rotation;
          planet.position.z = -8;
          planet.position.x = 3.5;
          planet.position.y = 1;
          scene.add(planet);

          //MOONS
            // pivots
          var pivot1 = new THREE.Object3D();
          var pivot2 = new THREE.Object3D();
          var pivot3 = new THREE.Object3D();
          pivot1.rotation.z = 0;
          pivot2.rotation.z = 2 * Math.PI / 3;
          pivot3.rotation.z = 4 * Math.PI / 3;;
          planet.add( pivot1 );
          planet.add( pivot2 );
          planet.add( pivot3 );

            // mesh
          var mesh1 = createPlanet1(0.15, segments);
          var mesh2 = createPlanet1(0.15, segments);
          var mesh3 = createPlanet1(0.15, segments);
          mesh1.position.y = 1;
          mesh2.position.y = 1;
          mesh3.position.y = 1;
          pivot1.add( mesh1 );
          pivot2.add( mesh2 );
          pivot3.add( mesh3 );


          // PLANET 2
          var planet2 = createPlanet2(0.6, segments);
          planet2.rotation.y = rotation;
          planet2.position.z = -8;
          planet2.position.x = -3;
          planet2.position.y = 1;
          scene.add(planet2);

          // PLANET 3 AND CLOUDS
          var clouds = createClouds(0.72, segments);
          clouds.rotation.y = rotation;
          clouds.position.z = -8;
          clouds.position.y = 2;
          scene.add(clouds);

          var planet3 = createPlanet3(0.7, segments);
          planet3.rotation.y = rotation;
          planet3.position.z = -8;
          planet3.position.y = 2;
          scene.add(planet3);

          var material =  new THREE.MeshPhongMaterial({
              map:         THREE.ImageUtils.loadTexture('assets/rings.jpg'),
              specular:    new THREE.Color('transparent'),
              side: THREE.DoubleSide
          });

          var circleGeometry = new THREE.CircleGeometry( 1, 64 );
          var circle = new THREE.Mesh( circleGeometry, material);
          planet2.add( circle );

          var domEvents   = new THREEx.DomEvents(camera, renderer.domElement);

          domEvents.addEventListener(planet, 'click', function(event){
              alert('You clicked on the green planet')
          }, false);


          var stars = createStars(90, 64);
          scene.add(stars);

          var controls = new THREE.TrackballControls(camera);

          webglEl.appendChild(renderer.domElement);

          render();

          var vector = new THREE.Vector3( 0.005, 0, 0 );
          var camera_x = 0.0002;
          var camera_x_limit = false;

          function render() {

              controls.update();
              var vector = new THREE.Vector3( camera_x, 0, 0 );
              if (camera_x_limit == false){
                  if (camera_x < 0.05) {
                      camera_x += 0.0001;
                  }else{
                      camera_x_limit = true
                  }
              }
              if (camera_x_limit == true){
                  if (camera_x < 0.0001) {
                      camera_x_limit = false

                  }else{
                      camera_x -= 0.0001;
                  }
              }

              camera.lookAt(vector);

              planet.rotation.y += 0.003;
              planet.rotation.z += 0.01;

              planet2.rotation.z += 0.005;
              planet2.rotation.x += 0.002;

              clouds.rotation.y += 0.001;

              requestAnimationFrame(render);
              renderer.render(scene, camera);

          }

          function createPlanet1(radius, segments) {
              return new THREE.Mesh(
                      new THREE.SphereGeometry(radius, segments, segments),
                      new THREE.MeshPhongMaterial({
                          map:         THREE.ImageUtils.loadTexture('assets/planet1.jpg'),
                          specular:    new THREE.Color('grey')
                      })

              );
          }
          function createPlanet2(radius, segments) {
              return new THREE.Mesh(
                      new THREE.SphereGeometry(radius, segments, segments),
                      new THREE.MeshPhongMaterial({
                          map:         THREE.ImageUtils.loadTexture('assets/planet3.jpg'),
                          specular:    new THREE.Color('grey')
                      })

              );
          }
          function createPlanet3(radius, segments) {
              return new THREE.Mesh(
                      new THREE.SphereGeometry(radius, segments, segments),
                      new THREE.MeshPhongMaterial({
                          map:         THREE.ImageUtils.loadTexture('assets/planet2.jpg'),
                          specular:    new THREE.Color('grey')
                      })

              );
          }
          function createClouds(radius, segments) {
              return new THREE.Mesh(
                      new THREE.SphereGeometry(radius + 0.003, segments, segments),
                      new THREE.MeshPhongMaterial({
                          map:         THREE.ImageUtils.loadTexture('assets/fair_clouds_2k.png'),
                          transparent: true
                      })
              );
          }
          function createStars(radius, segments) {
              return new THREE.Mesh(
                      new THREE.SphereGeometry(radius, segments, segments),
                      new THREE.MeshBasicMaterial({
                          map:  THREE.ImageUtils.loadTexture('assets/galaxy_starfield.png'),
                          side: THREE.BackSide
                      })
              );
          }
      }());
