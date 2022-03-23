resource "local_file" "foo" {
  content     = "foo!"
  filename = "${path.root}/foo.bar"
}