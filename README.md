![](https://github.com/CallePuzzle/terraform-orchestration-action/workflows/Test/badge.svg)

# Terraform Orchestration Action

This action is used to orchestrate Terraform modules. It searches for a Terraform module in the current directory which has been modified and runs Terraform inside the module.

## How to use

```yaml
on:
  pull_request:
    branches:
      - main
jobs:
  single:
    name: Single
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Test
        uses: CallePuzzle/terraform-orchestration-action@main
        with:
          baseRef: ${{ github.event.pull_request.base.sha }}
          headRef: ${{ github.event.pull_request.head.sha }}
```

## Script mode

```sh
npx ts-node src/script.ts
```
