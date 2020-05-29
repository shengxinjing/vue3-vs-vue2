import { createRenderer } from '@vue/runtime-core'
import * as THREE from 'three'
import {nextTick} from '@vue/runtime-core'
/*
patchProp(
  el: HostElement,
  key: string,
  prevValue: any,
  nextValue: any,
  isSVG?: boolean,
  prevChildren?: VNode<HostNode, HostElement>[],
  parentComponent?: ComponentInternalInstance | null,
  parentSuspense?: SuspenseBoundary | null,
  unmountChildren?: UnmountChildrenFn
): void
insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void
remove(el: HostNode): void
createElement(
  type: string,
  isSVG?: boolean,
  isCustomizedBuiltIn?: string
): HostElement
createText(text: string): HostNode
createComment(text: string): HostNode
setText(node: HostNode, text: string): void
setElementText(node: HostElement, text: string): void
parentNode(node: HostNode): HostElement | null
nextSibling(node: HostNode): HostNode | null
querySelector?(selector: string): HostElement | null
setScopeId?(el: HostElement, id: string): void
cloneNode?(node: HostNode): HostNode
insertStaticContent?(
  content: string,
  parent: HostElement,
  anchor: HostNode | null,
  isSVG: boolean
): HostElement[]
*/

let renderer

function draw(obj) {
    const {camera,cameraPos, scene, geometry,geometryArg,material,mesh,meshY,meshX} = obj
    if([camera,cameraPos, scene, geometry,geometryArg,material,mesh,meshY,meshX].filter(v=>v).length<9){
        return 
    }
    let cameraObj = new THREE[camera]( 40, window.innerWidth / window.innerHeight, 0.1, 10 )
    Object.assign(cameraObj.position,cameraPos)

    let sceneObj = new THREE[scene]()

    let geometryObj = new THREE[geometry]( ...geometryArg)
    let materialObj = new THREE[material]()

    let meshObj = new THREE[mesh]( geometryObj, materialObj )
    meshObj.rotation.x = meshX
    meshObj.rotation.y = meshY
    sceneObj.add( meshObj )
    renderer.render( sceneObj, cameraObj );

}

const { createApp: originCa } = createRenderer({
  insert: (child, parent, anchor) => {
    if(parent.domElement){
        draw(child)
    }
  },
  createElement(type, isSVG, isCustom) {
    return {
      type
    }
  },
  setElementText(node, text) {
  },
  patchProp(el, key, prev, next) {
    el[key] = next
    draw(el)
  },
  parentNode: node => node,
  nextSibling: node => node,
  createText: text => text,
  remove:node=>node

});
function createApp(...args) {
  const app = originCa(...args)
  return {
    mount(selector) {
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        app.mount(renderer)
    }
  }
}
export { createApp }

