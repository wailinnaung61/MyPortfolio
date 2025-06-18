---
title: "Kubernetes Pods and YAML"
date: "2025-06-01"
category: ["Technology"]
cover: "/images/blog/blog-image-8.jpg"
thumb: "/images/blog/sm/blog-image-8.jpg"
---

In Kubernetes, a **Pod** is the smallest deployable unit. As Kubernetes docs describe, _“A Pod is a group of one or more containers, with shared storage and network resources... A Pod’s contents are always co-located and co-scheduled, and run in a shared context”_. You typically run one container per Pod (though multiple tightly-coupled containers can share a Pod).

##### Pod Manifest Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
    - name: nginx-container
      image: nginx:1.14.2
      ports:
        - containerPort: 80
```

This YAML defines a Pod named `nginx-pod` that runs a single container from the `nginx:1.14.2` image. You apply it with `kubectl apply -f pod.yaml`.

##### Usage Notes

- **One container per Pod:** Most applications follow “one-container-per-Pod”; Kubernetes then manages scaling and recreation of Pods.
- **Sharing:** If you do use multiple containers in a Pod, they share network (localhost) and volumes (for inter-process communication).
- **Commands:** Use `kubectl create -f pod.yaml` or `kubectl apply -f pod.yaml`. Check status with `kubectl get pods`.

Pods run on nodes in the cluster (which must have a container runtime installed). The shared context of a Pod is defined by namespaces and cgroups, isolating it from other Pods. For production, Pods are typically managed by higher-level controllers (Deployments, ReplicaSets). For more, see the [Kubernetes Pods documentation](https://kubernetes.io/docs/concepts/workloads/pods/).

**References:** The official K8s docs explain Pods as “smallest deployable units” grouping one or more containers.
