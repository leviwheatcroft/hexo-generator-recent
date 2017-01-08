# hexo-generator-recent

Deprecated, unpublished from npm, delete repo Jan 2018

[Hexo](https://hexo.io/) plugin to generate a list of recent articles in JSON.
Suitable for consumption by APIs or feeds.

## Installation

```
  npm i --save hexo-generator-recent
```

## Usage

Just generate as usual

Using the default settings, the `recent.json` will contain the most recent 5
posts and list all keys

## Configuration

an example. would be included in `_config.yml`

```yaml
generatorRecent:
  file: recent.json
  number: 5
  sort: -date
  fields: # set to true for all fields (default)
    - title
    - slug
    - date
    - tags
```
