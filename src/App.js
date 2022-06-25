/* eslint-disable no-template-curly-in-string */
import "./App.css";
import { Pane } from "tweakpane";
import { arch, platform, version } from "@tauri-apps/api/os";
import { dataDir } from '@tauri-apps/api/path';



function App() {
  const pane = new Pane();

  async function getArch(name) {
    const archName = await arch();
    return archName;
  }

  async function getPlatform() {
    const platformName = await platform();
    return platformName;
  }

  async function getVersion() {
    const osVersion = await version();
    return osVersion;
  }

  async function getDataDir() {
    const dataDirPath = await dataDir();
    return dataDirPath;
  }

  const dataDirPath = getDataDir();

  // getArch().then((arch) => {
  //   console.log(arch);
  //   pane.addInput({ arch: arch }, "arch");
  // });

  // getPlatform().then((platform) => {
  //   console.log(platform);
  //   pane.addInput({ platform: platform }, "platform");
  // });

  // getVersion().then(version => {
  //   console.log(version);
  //   pane.addInput({ version: version }, "version");
  //   }
  // );

  let PARAMS = {
    speed: 10,
    acceleration: 10,
    randomness: 10,
  };

  const f1 = pane.addFolder({
    title: "Basic",
    expanded: false
  });
  getArch().then((arch) => {
    console.log(arch);
    f1.addMonitor({ arch: arch }, "arch");
  });

  const f2 = pane.addFolder({
    title: "Advanced",
    expanded: false, // optional
  });

  getPlatform().then((platform) => {
    console.log(platform);
    f2.addMonitor({ platform: platform }, "platform");
  });

  getVersion().then((version) => {
    console.log(version);
    f2.addMonitor({ version: version }, "version");
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    f2.addMonitor({time: time}, 'time', {
      interval: 1000,
    });
    f2.addMonitor({usage: version}, 'usage', {
      interval: 1000,
    });
    f2.addMonitor({wave: 0}, 'wave', {
      view: 'graph',
      min: -5,
      max: +5,
      interval: 100,
      label: 'Activity'
    });
  });
  // f2.refresh();
}

export default App;
