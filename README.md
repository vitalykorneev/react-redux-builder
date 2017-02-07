React-Redux components generator
==============================

This tool help you easy create components from your terminal

To use this tool you need have file structure like this

```
src
 |-— actions
 |-— components
 |-— constants
 |-— containers
 |-— reducers
```

Usage
-----

```
$ npm install -D react-redux-builder
```
Generate React Component
```
$ react-redux-builder g <ReactComponentName> -c
```

Generate React Container
```
$ react-redux-builder g <ReactContainerName> -C
```

Generate Redux action
```
$ react-redux-builder g <ReduxActionName> -a <ReducerName>
```

Generate Redux reducer
```
$ react-redux-builder g <ReduxReducerName> -r
```
