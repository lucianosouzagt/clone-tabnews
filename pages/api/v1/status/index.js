function status(request, response) {
  response.status(200).json({ ping: "pong" });
}

export default status;
