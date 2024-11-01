# grpc-chromium

html to pdf

## Docker

要构建同时支持 ARM 和 AMD 平台的 Docker 镜像，你可以使用 Docker 的 buildx 插件，它是 Docker 的一个实验性功能，支持多平台构建。

首先，你需要启用 Docker 的实验性功能。你可以通过编辑 Docker 配置文件（通常位于 ~/.docker/config.json）来开启它。在这个文件中，添加 "experimental": "enabled"。

然后，你需要创建一个新的构建实例并启动它：

```bash
docker buildx create --use
```

现在，你可以使用 buildx 命令来构建你的镜像，并指定你想要支持的平台：

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t your-image-name . --push
```

在这个命令中，--platform 参数用于指定你想要支持的平台，你可以列出所有你想要支持的平台，用逗号分隔。--push 参数用于将构建的镜像推送到 Docker Hub。

请注意，这个命令需要在你的 Dockerfile 所在的目录中运行，而且你需要将 your-image-name 替换为你想要的镜像名。

## 镜像地址

- [Docker Hub](https://hub.docker.com/r/chenxiancai/grpc-chromium)

```bash
docker pull dasoncheng/grpc-chromium:tagname
```
