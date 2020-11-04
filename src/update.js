//get by id ONLY after viewer init
var willNotWork = BabylonViewer.viewerManager.getViewerById('babylon-viewer');
console.log('viewer not yet initialized');

// Pomise-based API:
BabylonViewer.viewerManager.getViewerPromiseById('babylon-viewer').then(function (viewer) {
    // this will resolve only after the viewer with this specific ID is initialized
    console.log('Using promises: ', 'viewer - ' + viewer.getBaseId());
    viewerObservables(viewer);

    viewer.onEngineInitObservable.add(function (scene) {
        setTimeout(() => {
            viewer.loadModel({
                url: "https://www.babylonjs.com/Assets/DamagedHelmet/glTF/DamagedHelmet.gltf"
            }).then(model => {
                console.log("model loaded!");
            }).catch(error => {
                console.log("error loading the model!", error);
            });
        }, 2500);
    });


});

// call back variant:
BabylonViewer.viewerManager.onViewerAdded = function (viewer) {
    console.log('Using viewerManager.onViewerAdded: ', 'viewer - ' + viewer.getBaseId());
}

// using observers:
BabylonViewer.viewerManager.onViewerAddedObservable.add(function (viewer) {
    console.log('Using viewerManager.onViewerAddedObservable: ', 'viewer - ' + viewer.getBaseId());
});

function viewerObservables(viewer) {
    viewer.onEngineInitObservable.add(function (engine) {
        console.log('Engine initialized');
    });

    viewer.onSceneInitObservable.add(function (scene) {
        console.log('Scene initialized');
    });

    viewer.onModelLoadedObservable.add(function (meshes) {
        console.log('Model loaded');
    });
}

function globalSceneInitCallback(scene) {
    console.log('scene-init function defined in the configuration');
}


function updateModelURL(blobGltf) {
    // Pomise-based API:
    BabylonViewer.viewerManager.getViewerPromiseById('babylon-viewer').then(function (viewer) {
        // this will resolve only after the viewer with this specific ID is initialized
        console.log('Using promises: ', 'viewer - ' + viewer.getBaseId());
        viewerObservables(viewer);

        /* 
        based on extention. missing on blob url !
        https://doc.babylonjs.com/extensions/advanced_usage
        https://github.com/BabylonJS/Babylon.js/blob/ff089c8c2cecf1a7b8971c1feada514bf29a36fe/dist/preview%20release/viewer/babylon.viewer.d.ts#L1554
        https://doc.babylonjs.com/extensions/configuring_the_viewer
        maybe change to https://doc.babylonjs.com/how_to/load_from_any_file_type ?
        */
        let loader = blobGltf.type === 'model/gltf+json' ? ".gltf" : ".glb";
        console.log(loader);

        viewer.loadModel({
            url: URL.createObjectURL(blobGltf),
            loader: loader
        }).then(model => {
            console.log("model loaded!");
        }).catch(error => {
            console.log("error loading the model!", error);
        });




    });
}