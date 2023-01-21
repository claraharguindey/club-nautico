let scene,camera,renderer;
const [width,height]=[300,200];
let flag;
let flagColor = "#ffffff";
let flagTexture = null;
const [sizeW,sizeH,segW,segH] = [50,30,50,30];

const init = () =>  {
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,width/height,1,1000);
    camera.position.set(0,0,40);
    camera.lookAt(new THREE.Vector3(0,0.0));
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(width,height);
    document.getElementById("flagRenderArea").appendChild(renderer.domElement);
    const light = new THREE.DirectionalLight("#FFFFFF");
    light.position.set(10,50,100);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight("#999999");
    scene.add(ambientLight);
    let geometry = new THREE.CylinderGeometry(0.5,0.5,40,16,1);
    let material = new THREE.MeshPhongMaterial({
        color:"#ffcc99",
        specular: "#999999",
        shininess: 30
    });

    geometry = new THREE.PlaneGeometry(sizeW,sizeH,segW,segH);
    material = new THREE.MeshLambertMaterial({
        color:flagColor,
        side:THREE.DoubleSide
    });
    flag = new THREE.Mesh(geometry,material);
    scene.add(flag);
    update();
}

const initFlag = () => {
    flagColor = "#ffffff";
    loadTexture();
    setMaterial();
    setCamera();
}

const setMaterial = () => {
    flag.material = new THREE.MeshLambertMaterial({
        color: flagColor,
        map: flagTexture,
        side: THREE.DoubleSide
    });
}

const loadTexture = () => {
        const loader = new THREE.TextureLoader();
        loader.load("media/flag2.png",texture => {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            flagTexture = texture;
            setMaterial();
        });
}

const setCamera = () => {
    const angle = -17;
    camera.position.x = 40 * Math.sin(angle * Math.PI/180);
    camera.position.z = 40 * Math.cos(angle * Math.PI/180);
    camera.lookAt(new THREE.Vector3(0,0,0));
}

const update = () => {
    const h = 0.5;
    const v = 0.3;
    const w = 0.1;
    const s = 0.4;

    for (let y=0; y<segH+1; y++) {
        for (let x=0; x<segW+1; x++) {
            const index = x + y * (segW+1);
            const vertex = flag.geometry.vertices[index];
            const time = Date.now() * s / 50;
            vertex.z = Math.sin(h * x + v * y - time) * w * x / 4;
        }
    }
    flag.geometry.verticesNeedUpdate = true;
    renderer.render(scene,camera);
    window.requestAnimationFrame(update);
}
