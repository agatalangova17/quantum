window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); 
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
        camera.wheelPrecision = 0; 
        camera.lowerRadiusLimit = 5; 
        camera.upperRadiusLimit = 5; 
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var coin = BABYLON.MeshBuilder.CreateCylinder("coin", {
            diameter: 2, height: 0.1, tessellation: 100
        }, scene);
        coin.rotation.x = Math.PI / 2; 
        return scene;
    };

    var scene = createScene();

    engine.runRenderLoop(function() {
        scene.getMeshByName("coin").rotate(BABYLON.Vector3.Up(), BABYLON.Tools.ToRadians(1), BABYLON.Space.WORLD);
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function preloadImages(array) {
    array.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const concepts = [
        { title: 'Superposition', description: 'Austrian physicist Erwin Schrödinger, a founder of quantum mechanics, is most famous for his thought experiment involving a cat in a sealed box with a 50% chance of being killed within an hour. Common sense suggests the cat is either alive or dead, but Schrödinger argued that, until the box is opened, the cat is both alive and dead simultaneously, existing in a blur of probabilities. This paradox highlights the concept of superposition, which he found so disturbing that he eventually abandoned quantum physics for biology. Despite its absurdity, Schrödinger’s cat is crucial for understanding quantum computers today. This principle of superposition enables quantum computers to perform complex calculations at speeds unimaginable for classical computers.', imgSrc: 'superposition.jpg' },
        { title: 'Entanglement', description: 'Phenomenon where particles become interlinked so that the state of one particle instantly determines the state of another, regardless of distance. This concept is critical in quantum computing, where entangled particles, or qubits, allow for simultaneous operations across all connected qubits, greatly increasing computing power.', imgSrc: 'en.jpg' },
        { title: 'Interference', description: 'Imagine when two waves in a sea overlap; where they meet, they either amplify each other or cancel each other out. In quantum computing, qubits can represent multiple possibilities simultaneously, and when they interact, their wave-like properties can interfere. This interference can be harnessed to enhance the correct solutions while canceling out the incorrect ones, allowing quantum computers to solve complex problems more efficiently.', imgSrc: 'interference.avif' }
    ];

    const container = document.getElementById('concept-container');
    let currentConcept = 0;

    function updateConcept(index) {
        currentConcept = index;
        const concept = concepts[index];
        container.style.opacity = 0;
        setTimeout(() => {
            container.innerHTML = `<img id="concept-image" src="${concept.imgSrc}" alt="Concept Image" style="max-width: 100%; height: auto; margin-top: 20px;">
                                   <h2 style="margin-bottom: 20px; color: white;">${concept.title}</h2>
                                   <p style="background-color: rgba(0, 0, 0, 0.5); color: white; padding: 10px;">${concept.description}</p>`;
            container.style.opacity = 1;
        }, 500);
    }

    document.querySelector('.left-arrow').addEventListener('click', () => {
        updateConcept((currentConcept - 1 + concepts.length) % concepts.length);
    });

    document.querySelector('.right-arrow').addEventListener('click', () => {
        updateConcept((currentConcept + 1) % concepts.length);
    });

    updateConcept(currentConcept);
});

document.querySelectorAll('.image-wrapper').forEach(function(wrapper) {
    wrapper.addEventListener('click', function() {
        this.classList.toggle('clicked');
        var image = this.querySelector('img');
        var text = this.querySelector('p');
        image.classList.toggle('clicked');
        if (text.classList.contains('visible')) {
            text.classList.remove('visible');
            text.classList.add('hidden');
        } else {
            text.classList.remove('hidden');
            text.classList.add('visible');
        }
    });
});

document.querySelectorAll('.image-description').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('expanded');
        this.querySelector('.hover-title').classList.toggle('hide-title');
    });
});

document.querySelectorAll('#sky-is-the-limit .field-item').forEach(item => {
    item.addEventListener('click', function() {
        const extraContent = this.querySelector('.extra-content');
        if (extraContent.style.maxHeight) {
            extraContent.style.maxHeight = null;
        } else {
            document.querySelectorAll('#sky-is-the-limit .extra-content').forEach(el => {
                if (el !== extraContent) {
                    el.style.maxHeight = null;
                }
            });
            extraContent.style.maxHeight = extraContent.scrollHeight + "px";
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('quantumGraph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...Array(20).keys()],  
            datasets: [{
                label: '',  
                data: Array.from({length: 20}, (_, i) => Math.exp(i)),  
                borderColor: 'rgb(0, 0, 0)',  
                backgroundColor: 'rgba(0, 0, 0, 0.5)'  
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {  
                    title: {
                        display: true,
                        text: 'Year',  
                        color: '#000',  
                        font: {
                            size: 25 
                        }
                    },
                    ticks: {
                        display: false  
                    }
                },
                y: {  
                    title: {
                        display: true,
                        text: 'Number of Qubits',  
                        color: '#000',  
                        font: {
                            size: 25  
                        }
                    },
                    ticks: {
                        display: false  
                    }
                }
            },
            animation: {
                duration: 2000
            },
            plugins: {
                legend: {
                    display: false  
                }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });

    var container = document.getElementById('lattice-animation');
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    renderer.setClearColor(new THREE.Color('rgb(0, 251, 255)'), 1); 
    camera.position.z = 20;
    var geometry = new THREE.BoxGeometry(12, 12, 12);
    var edges = new THREE.EdgesGeometry(geometry);  
    var material = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 }); 
    var cube = new THREE.LineSegments(edges, material);  
    scene.add(cube);

    var dotGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    var dotMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); 
    var numDotsPerAxis = 5;
    var step = 12 / (numDotsPerAxis - 1);

    for (let i = 0; i < numDotsPerAxis; i++) {
        for (let j = 0; j < numDotsPerAxis; j++) {
            for (let k = 0; k < numDotsPerAxis; k++) {
                var dot = new THREE.Mesh(dotGeometry, dotMaterial);
                dot.position.set(-6 + i * step, -6 + j * step, -6 + k * step);
                cube.add(dot);
            }
        }
    }

    window.addEventListener('resize', function() {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });

    var animate = function() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();
});

document.getElementById('toggleButton').addEventListener('click', function() {
    const storage = document.querySelector('.storage');
    const decryptedStorage = document.querySelector('.decrypted-storage');
    const button = document.getElementById('toggleButton');

    if (storage.style.opacity !== '0') {
        storage.style.opacity = '0';
        setTimeout(() => {
            decryptedStorage.style.opacity = '1';
            button.innerHTML = 'Encrypt';
        }, 500); 
    } else {
        decryptedStorage.style.opacity = '0';
        setTimeout(() => {
            storage.style.opacity = '1';
            button.innerHTML = 'Decrypt';
        }, 500); 
    }
});
