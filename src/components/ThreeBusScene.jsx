import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

// Utility to create materials
const glossy = (color) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.2, metalness: 0.0, clearcoat: 0.6, clearcoatRoughness: 0.2 })

function buildBus() {
  const group = new THREE.Group()

  // Bus body - lower deck
  const lower = new THREE.Mesh(new RoundedBoxGeometry(10, 3, 4, 6, 0.4), glossy('#e63946'))
  lower.position.y = 1.8
  group.add(lower)

  // Upper deck
  const upper = new THREE.Mesh(new RoundedBoxGeometry(9.5, 2.6, 4, 6, 0.35), glossy('#457b9d'))
  upper.position.y = 4.1
  group.add(upper)

  // Front rounded nose
  const nose = new THREE.Mesh(new THREE.CapsuleGeometry(2.2, 4.5, 6, 16), glossy('#f1fa8c'))
  nose.rotation.z = Math.PI / 2
  nose.position.set(6, 2.6, 0)
  group.add(nose)

  // Windows
  const windowMat = new THREE.MeshPhysicalMaterial({ color: '#cbe7ff', roughness: 0.1, metalness: 0.0, transmission: 0.6, thickness: 0.2 })
  for (let y = 3.4; y <= 4.6; y += 1.2) {
    for (let x = -4.5; x <= 3; x += 2) {
      const w = new THREE.Mesh(new RoundedBoxGeometry(1.4, 0.8, 0.1, 3, 0.12), windowMat)
      w.position.set(x, y, 2.05)
      group.add(w)
      const w2 = w.clone(); w2.position.z = -2.05; group.add(w2)
    }
  }

  // Wheels
  const wheelMat = new THREE.MeshStandardMaterial({ color: '#111' })
  const rimMat = new THREE.MeshStandardMaterial({ color: '#ddd' })
  const wheelPositions = [ [-3.5, 0.9, 2], [2.5, 0.9, 2], [-3.5, 0.9, -2], [2.5, 0.9, -2] ]
  wheelPositions.forEach(([x,y,z])=>{
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.35, 12, 24), wheelMat)
    tire.rotation.x = Math.PI/2
    tire.position.set(x,y,z)
    group.add(tire)
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,0.2,16), rimMat)
    rim.rotation.x = Math.PI/2
    rim.position.set(x,y,z)
    group.add(rim)
  })

  // Cute eyes front
  const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16,16), new THREE.MeshStandardMaterial({ color: 'white' }))
  eyeWhite.position.set(5.3, 3.2, 0.8)
  const eyeWhite2 = eyeWhite.clone(); eyeWhite2.position.z = -0.8
  const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12,12), new THREE.MeshStandardMaterial({ color: '#222' }))
  pupil.position.set(5.45,3.15,0.95)
  const pupil2 = pupil.clone(); pupil2.position.z = -0.95
  group.add(eyeWhite, eyeWhite2, pupil, pupil2)

  // Fun stripes
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.25, 4.2), glossy('#ffd166'))
  stripe.position.y = 2.8
  group.add(stripe)

  group.name = 'KidsPlayBus'
  return group
}

function buildInterior() {
  const group = new THREE.Group()
  // Floor
  const floor = new THREE.Mesh(new RoundedBoxGeometry(10, 0.3, 4, 2, 0.1), glossy('#fef08a'))
  floor.position.y = 0
  group.add(floor)
  // Slides
  const slide = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.2, 5, 24, 1, false, 0, Math.PI/2), glossy('#ff6b6b'))
  slide.rotation.z = -Math.PI/3
  slide.position.set(-2, 2, 0)
  group.add(slide)
  // Ball pit walls
  const pit = new THREE.Mesh(new RoundedBoxGeometry(3.2, 0.8, 2.2, 3, 0.2), glossy('#6bcB77'))
  pit.position.set(3, 0.6, 0)
  group.add(pit)
  // Mini climbing blocks
  for (let i=0;i<4;i++){
    const b = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.6 + i*0.2, 1.0, 3, 0.15), glossy(new THREE.Color(`hsl(${(i*60)%360},90%,60%)`)))
    b.position.set(-4 + i*1.2, 0.4 + i*0.1, -1 + (i%2)*2)
    group.add(b)
  }
  // Seats
  for (let i=0;i<4;i++){
    const s = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.6, 0.8, 3, 0.2), glossy('#93c5fd'))
    s.position.set(-1 + (i%2)*2, 0.5, -1.2 + Math.floor(i/2)*2.4)
    group.add(s)
  }
  group.name = 'KidsPlayBusInterior'
  return group
}

function buildBallPitSimulation() {
  const group = new THREE.Group()
  const bounds = new THREE.Mesh(new RoundedBoxGeometry(6, 1, 6, 3, 0.3), glossy('#90EE90'))
  group.add(bounds)
  // balls
  const balls = new THREE.Group(); balls.name = 'balls'
  for (let i=0;i<150;i++){
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16,16), glossy(new THREE.Color(`hsl(${(i*17)%360},95%,60%)`)))
    c.position.set((Math.random()-0.5)*4.8, Math.random()*4+1, (Math.random()-0.5)*4.8)
    c.userData.vy = 0
    balls.add(c)
  }
  group.add(balls)
  group.userData.simulate = (dt)=>{
    balls.children.forEach((b)=>{
      b.userData.vy -= 9.8*dt*0.6
      b.position.y += b.userData.vy*dt
      if (b.position.y < 0.6){ b.position.y = 0.6; b.userData.vy *= -0.35 }
    })
  }
  group.name = 'BallPit'
  return group
}

function buildIcons() {
  const group = new THREE.Group()
  const iconMat = glossy('#ffffff')
  const slideIcon = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8, 2, 3), glossy('#fb7185'))
  slideIcon.position.x = -2
  const safetyIcon = new THREE.Mesh(new THREE.OctahedronGeometry(0.9), glossy('#34d399'))
  const partyIcon = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9), glossy('#f59e0b'))
  partyIcon.position.x = 2
  group.add(slideIcon, safetyIcon, partyIcon)
  group.name = 'Icons'
  return group
}

export default function ThreeBusScene({ mode = 'bus', autoRotate = true, allowExport = false, style = {} }) {
  const mountRef = useRef(null)
  const [ready, setReady] = useState(false)
  const objRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const clockRef = useRef(new THREE.Clock())

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#f8fafc')

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(9, 6, 12)

    const hemi = new THREE.HemisphereLight(0xffffff, 0x445566, 1.2)
    scene.add(hemi)
    const dir = new THREE.DirectionalLight(0xffffff, 1.0)
    dir.position.set(5,10,7)
    dir.castShadow = false
    scene.add(dir)

    const base = new THREE.Group(); scene.add(base)
    let object
    if (mode === 'bus') object = buildBus()
    if (mode === 'interior') object = buildInterior()
    if (mode === 'ballpit') object = buildBallPitSimulation()
    if (mode === 'icons') object = buildIcons()
    base.add(object)

    const grid = new THREE.GridHelper(40, 40, 0xdddddd, 0xeeeeee)
    grid.position.y = 0
    scene.add(grid)

    // Drag rotate
    let isDragging = false; let px=0, py=0
    const onDown = (e)=>{ isDragging = true; px = e.clientX; py = e.clientY }
    const onMove = (e)=>{ if(!isDragging) return; const dx = (e.clientX-px); const dy=(e.clientY-py); base.rotation.y += dx*0.005; base.rotation.x += dy*0.005; px=e.clientX; py=e.clientY }
    const onUp = ()=>{ isDragging = false }
    renderer.domElement.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    const onResize = ()=>{
      const w = mount.clientWidth, h = mount.clientHeight
      renderer.setSize(w,h)
      camera.aspect = w/h; camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    function animate(){
      const dt = clockRef.current.getDelta()
      if (autoRotate && !isDragging){ base.rotation.y += dt*0.3 }
      if (object && object.userData.simulate){ object.userData.simulate(dt) }
      renderer.render(scene, camera)
      req = requestAnimationFrame(animate)
    }
    let req = requestAnimationFrame(animate)

    // keep refs
    objRef.current = object
    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera
    setReady(true)

    return () => {
      cancelAnimationFrame(req)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      renderer.domElement.removeEventListener('mousedown', onDown)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [mode, autoRotate])

  const exportGLB = () => {
    if (!objRef.current) return
    const exporter = new GLTFExporter()
    exporter.parse(objRef.current, (gltf) => {
      const blob = new Blob([gltf instanceof ArrayBuffer ? gltf : JSON.stringify(gltf)], { type: 'model/gltf-binary' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${objRef.current.name || 'model'}.glb`
      a.click()
      URL.revokeObjectURL(url)
    }, { binary: true })
  }

  const exportOBJ = () => {
    if (!objRef.current) return
    const exporter = new OBJExporter()
    const result = exporter.parse(objRef.current)
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${objRef.current.name || 'model'}.obj`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="relative w-full h-full" style={style}>
      <div ref={mountRef} className="w-full h-full rounded-3xl overflow-hidden bg-white/60" />
      {allowExport && (
        <div className="absolute bottom-3 left-3 flex gap-2">
          <button onClick={exportGLB} className="px-3 py-2 text-xs rounded-full bg-rose-500 text-white shadow">Export GLB</button>
          <button onClick={exportOBJ} className="px-3 py-2 text-xs rounded-full bg-blue-600 text-white shadow">Export OBJ</button>
        </div>
      )}
    </div>
  )
}
