function loop() {
  postMessage({});
  setTimeout(loop, 1000 / 20);
}

loop();
