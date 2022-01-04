# [Github Action] A test action for CoP
## Usage

## Example

```yaml
name: Test Github Action
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Test
      uses: AJ1041927/github-action-test@main
      with:
        test: Test something
        enable_debug: ${{ secrets.ENABLE_DEBUG }}
```

## Mandatory Arguments

`test` A string

## Optional Arguments

`enable_debug` boolean to enable log

## Outputs

`TEST_OUTPUT` value after doing the action