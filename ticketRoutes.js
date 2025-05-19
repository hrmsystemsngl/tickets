router.put('/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
});
