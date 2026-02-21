const QUESTIONS = [
  // ==================== AWS (15) ====================
  {
    id: 1, category: "AWS", difficulty: "Junior",
    question: "What is the difference between an AWS Security Group and a NACL (Network ACL)?",
    answer: "Security Groups are stateful and operate at the instance level. NACLs are stateless and operate at the subnet level.",
    explanation: "Security Groups automatically allow return traffic regardless of rules (stateful). NACLs require explicit inbound and outbound rules because they don't track connections (stateless). SGs support allow rules only; NACLs support allow and deny."
  },
  {
    id: 2, category: "AWS", difficulty: "Junior",
    question: "What are the three types of Elastic Load Balancers in AWS?",
    answer: "Application Load Balancer (ALB), Network Load Balancer (NLB), and Gateway Load Balancer (GLB).",
    explanation: "ALB operates at Layer 7 (HTTP/HTTPS) for content-based routing. NLB operates at Layer 4 (TCP/UDP) for ultra-low latency. GLB is for deploying and managing third-party virtual appliances like firewalls."
  },
  {
    id: 3, category: "AWS", difficulty: "Junior",
    question: "What is an AWS VPC and why do you need one?",
    answer: "A Virtual Private Cloud is an isolated virtual network in AWS where you launch resources with full control over IP ranges, subnets, route tables, and gateways.",
    explanation: "VPCs provide network isolation, security boundaries, and custom networking configurations. You define CIDR blocks, create public/private subnets, and control traffic flow with route tables, NACLs, and security groups."
  },
  {
    id: 4, category: "AWS", difficulty: "Mid",
    question: "Explain the difference between S3 Standard, S3-IA, S3 One Zone-IA, and S3 Glacier.",
    answer: "They differ in access frequency, availability, and cost. Standard is for frequent access; IA for infrequent; One Zone-IA stores in a single AZ; Glacier is for archival with retrieval delays.",
    explanation: "Standard: 99.99% availability, highest cost. S3-IA: 99.9%, lower storage cost but retrieval fee. One Zone-IA: 99.5%, cheapest IA option but no AZ redundancy. Glacier: minutes to hours retrieval. Deep Archive: 12-48 hour retrieval. Use lifecycle policies to auto-transition."
  },
  {
    id: 5, category: "AWS", difficulty: "Mid",
    question: "How does AWS Auto Scaling determine when to add or remove instances?",
    answer: "Through scaling policies based on CloudWatch metrics (target tracking, step scaling, or simple scaling), scheduled actions, or predictive scaling.",
    explanation: "Target tracking maintains a specific metric value (e.g., 70% CPU). Step scaling adds/removes based on alarm threshold ranges. Predictive scaling uses ML to forecast demand. Cooldown periods prevent thrashing between scale events."
  },
  {
    id: 6, category: "AWS", difficulty: "Mid",
    question: "What is the difference between AWS CloudFormation and AWS CDK?",
    answer: "CloudFormation uses declarative JSON/YAML templates. CDK lets you define infrastructure using programming languages (TypeScript, Python, etc.) that synthesize to CloudFormation templates.",
    explanation: "CDK provides higher-level abstractions (Constructs) and the full power of programming languages — loops, conditions, type safety. CloudFormation is the underlying engine for both. CDK is often faster for complex stacks but adds an abstraction layer."
  },
  {
    id: 7, category: "AWS", difficulty: "Mid",
    question: "What happens when an EC2 instance in an Auto Scaling Group fails a health check?",
    answer: "The ASG terminates the unhealthy instance and launches a replacement to maintain the desired capacity.",
    explanation: "Health checks can be EC2 status checks or ELB health checks. When an instance is marked unhealthy, ASG terminates it, decrements current capacity, then launches a new instance to meet desired count. The replacement uses the current launch template/configuration."
  },
  {
    id: 8, category: "AWS", difficulty: "Senior",
    question: "Design a multi-region, active-active architecture on AWS. What services and patterns would you use?",
    answer: "Use Route 53 with latency/failover routing, DynamoDB Global Tables or Aurora Global Database, S3 cross-region replication, CloudFront for edge caching, and region-specific ECS/EKS clusters.",
    explanation: "Key challenges: data consistency (eventual vs strong), conflict resolution, session management (use DynamoDB or ElastiCache Global Datastore), DNS failover health checks, and deployment coordination. Use infrastructure-as-code deployed per region. Consider CRDTs for conflict-free replicated data."
  },
  {
    id: 9, category: "AWS", difficulty: "Senior",
    question: "How would you implement a zero-downtime database migration on AWS with minimal risk?",
    answer: "Use AWS DMS (Database Migration Service) with continuous replication, a blue/green approach with DNS cutover, and thorough validation before switching.",
    explanation: "Steps: 1) Set up DMS replication task (full load + CDC). 2) Validate data consistency with DMS validation. 3) During maintenance window, stop writes to source. 4) Wait for replication lag to reach zero. 5) Switch application connection strings. 6) Keep source available for rollback. Consider schema conversion with AWS SCT."
  },
  {
    id: 10, category: "AWS", difficulty: "Senior",
    question: "Explain AWS Organizations, SCPs, and how you'd design a multi-account strategy.",
    answer: "AWS Organizations manages multiple accounts centrally. SCPs (Service Control Policies) set permission guardrails. Use a landing zone pattern with separate accounts for security, logging, shared services, and workloads.",
    explanation: "Design: Root → OUs (Security, Infrastructure, Workloads, Sandbox). Security account: GuardDuty master, SecurityHub. Log account: centralized CloudTrail, Config. SCPs deny risky actions (leaving org, disabling CloudTrail). Use AWS Control Tower for automated setup. Federate access via SSO."
  },
  {
    id: 11, category: "AWS", difficulty: "Junior",
    question: "What is the difference between an EC2 instance's public IP and an Elastic IP?",
    answer: "A public IP changes when an instance stops/starts. An Elastic IP is a static public IP that persists and can be remapped between instances.",
    explanation: "Public IPs are dynamically assigned from a pool and released on stop. Elastic IPs are allocated to your account and remain until explicitly released. You're charged for EIPs not associated with running instances to discourage hoarding."
  },
  {
    id: 12, category: "AWS", difficulty: "Mid",
    question: "What is the AWS Shared Responsibility Model?",
    answer: "AWS is responsible for security 'of' the cloud (physical infra, hypervisor, networking). Customers are responsible for security 'in' the cloud (OS patches, app code, IAM, data encryption, network config).",
    explanation: "For IaaS (EC2): Customer manages OS, firewall, app. For PaaS (RDS): AWS manages OS patching, customer manages DB users and data. For SaaS (S3): AWS manages more, customer manages access policies and encryption settings. Understanding this model is essential for compliance."
  },
  {
    id: 13, category: "AWS", difficulty: "Senior",
    question: "How would you debug intermittent 502 errors from an ALB?",
    answer: "Check target group health checks, backend instance health, connection timeouts, keep-alive settings, and ALB access logs. Common causes: target deregistration during deployments, health check misconfiguration, and backend connection limits.",
    explanation: "Steps: 1) Check ALB access logs for target response codes. 2) Check target group health. 3) Verify keep-alive timeout (target > ALB idle timeout of 60s). 4) Check if targets are being drained during deploys. 5) Check security group rules. 6) Look at target instance metrics (CPU, memory, open connections). Metric: HTTPCode_ELB_502_Count."
  },
  {
    id: 14, category: "AWS", difficulty: "Mid",
    question: "What is AWS IAM and what's the principle of least privilege?",
    answer: "IAM manages authentication and authorization in AWS. Least privilege means granting only the minimum permissions needed for a task — no more.",
    explanation: "Use IAM policies (JSON) attached to users, groups, or roles. Prefer roles over long-lived keys. Use conditions (IP, MFA, time). Audit with IAM Access Analyzer and credential reports. Never use root account for daily work."
  },
  {
    id: 15, category: "AWS", difficulty: "Senior",
    question: "How does AWS Lambda cold start work, and how would you minimize it in production?",
    answer: "Cold start occurs when Lambda creates a new execution environment (download code, init runtime, run init code). Minimize with Provisioned Concurrency, smaller packages, and keeping functions warm.",
    explanation: "Cold start adds 100ms-2s+ depending on runtime and package size. Provisioned Concurrency pre-initializes environments. Other optimizations: use lightweight runtimes (Python, Node), minimize dependencies, use Lambda layers, move heavy init outside handler. SnapStart (Java) snapshots initialized state."
  },

  // ==================== Kubernetes (15) ====================
  {
    id: 16, category: "Kubernetes", difficulty: "Junior",
    question: "What is the difference between a Pod, Deployment, and Service in Kubernetes?",
    answer: "A Pod is the smallest deployable unit (one or more containers). A Deployment manages Pod replicas and updates. A Service provides stable networking to access Pods.",
    explanation: "Pods are ephemeral and get new IPs when restarted. Deployments manage ReplicaSets to maintain desired state and enable rolling updates. Services use label selectors to route traffic to matching Pods, providing a stable ClusterIP, NodePort, or LoadBalancer endpoint."
  },
  {
    id: 17, category: "Kubernetes", difficulty: "Junior",
    question: "What is a Kubernetes namespace and when would you use one?",
    answer: "A namespace is a virtual cluster within a physical cluster, used to isolate resources, apply RBAC, set resource quotas, and organize workloads.",
    explanation: "Default namespaces: default, kube-system, kube-public, kube-node-lease. Use namespaces for multi-team isolation, environment separation (dev/staging), and applying ResourceQuotas and LimitRanges. DNS: service.namespace.svc.cluster.local."
  },
  {
    id: 18, category: "Kubernetes", difficulty: "Junior",
    question: "What are the main components of the Kubernetes control plane?",
    answer: "kube-apiserver (API gateway), etcd (key-value store), kube-scheduler (assigns Pods to nodes), kube-controller-manager (runs controllers), and cloud-controller-manager.",
    explanation: "API server: validates and processes REST operations. etcd: stores all cluster state. Scheduler: considers resource requirements, affinity, taints/tolerations. Controller manager: runs node, replication, endpoint, service account controllers. Cloud controller: integrates with cloud provider APIs."
  },
  {
    id: 19, category: "Kubernetes", difficulty: "Mid",
    question: "Explain the difference between a DaemonSet, StatefulSet, and Deployment.",
    answer: "Deployment: stateless apps with interchangeable replicas. StatefulSet: stateful apps with stable identities and persistent storage. DaemonSet: runs exactly one Pod per node.",
    explanation: "StatefulSet guarantees ordered deployment, stable network identifiers (pod-0, pod-1), and persistent volumes per Pod. DaemonSet is for node-level agents like log collectors, monitoring agents, or CNI plugins. Deployments are for horizontally scalable, stateless workloads."
  },
  {
    id: 20, category: "Kubernetes", difficulty: "Mid",
    question: "How do Kubernetes liveness, readiness, and startup probes differ?",
    answer: "Liveness: restarts container if it fails. Readiness: removes Pod from service endpoints if it fails. Startup: disables other probes until the app starts.",
    explanation: "Liveness detects deadlocks — container is running but stuck. Readiness prevents traffic to pods that aren't ready (e.g., loading cache). Startup probes protect slow-starting containers from being killed by liveness probes. All support HTTP, TCP, and exec checks."
  },
  {
    id: 21, category: "Kubernetes", difficulty: "Mid",
    question: "What are taints and tolerations in Kubernetes?",
    answer: "Taints are applied to nodes to repel Pods. Tolerations are applied to Pods to allow scheduling on tainted nodes. Together they control which Pods can run where.",
    explanation: "Effects: NoSchedule (don't schedule new pods), PreferNoSchedule (soft version), NoExecute (evict existing pods too). Example use cases: dedicated GPU nodes, master node isolation, draining nodes. Taints/tolerations complement node affinity for advanced scheduling."
  },
  {
    id: 22, category: "Kubernetes", difficulty: "Mid",
    question: "How does a Kubernetes rolling update work and how do you configure it?",
    answer: "Rolling updates replace Pods incrementally by creating new ReplicaSets while scaling down old ones. Configure with maxSurge and maxUnavailable in the Deployment spec.",
    explanation: "maxSurge: how many extra Pods above desired count (e.g., 25%). maxUnavailable: how many Pods can be unavailable during update (e.g., 25%). Use readiness probes to gate traffic. Rollback with `kubectl rollout undo`. Monitor with `kubectl rollout status`."
  },
  {
    id: 23, category: "Kubernetes", difficulty: "Senior",
    question: "What happens when a Pod exceeds its memory limit in Kubernetes?",
    answer: "The container is OOMKilled (Out Of Memory killed) by the kernel's OOM killer. Kubernetes then restarts it based on the restartPolicy.",
    explanation: "Memory limits are enforced by cgroups. When a container exceeds its limit, the Linux OOM killer terminates it. The Pod's status shows OOMKilled. CPU limits are different — containers get throttled, not killed. Always set both requests (scheduling) and limits (enforcement). Monitor with metrics-server or Prometheus."
  },
  {
    id: 24, category: "Kubernetes", difficulty: "Senior",
    question: "How does the Kubernetes Horizontal Pod Autoscaler (HPA) work?",
    answer: "HPA periodically queries metrics (CPU, memory, or custom) and adjusts replica count to maintain target utilization. It uses a control loop with a default 15-second sync period.",
    explanation: "Algorithm: desiredReplicas = ceil(currentReplicas × (currentMetricValue / targetMetricValue)). Stabilization window prevents flapping (default 5min for scale-down). Can use multiple metrics. Requires metrics-server. For custom metrics, use Prometheus Adapter or KEDA for event-driven scaling."
  },
  {
    id: 25, category: "Kubernetes", difficulty: "Senior",
    question: "Explain the Kubernetes networking model and how Pod-to-Pod communication works.",
    answer: "Every Pod gets a unique cluster-wide IP. Pods can communicate directly without NAT. This is implemented by CNI plugins (Calico, Cilium, Flannel) using overlay networks or BGP routing.",
    explanation: "Three fundamental requirements: 1) Pod-to-Pod across nodes without NAT. 2) Agents on a node can communicate with all Pods on that node. 3) Pods in host network can reach all Pods. CNI plugins implement this differently: Flannel uses VXLAN overlays, Calico uses BGP, Cilium uses eBPF. Services add an abstraction layer with kube-proxy (iptables or IPVS mode)."
  },
  {
    id: 26, category: "Kubernetes", difficulty: "Senior",
    question: "How would you debug a Pod stuck in CrashLoopBackOff?",
    answer: "Check: kubectl describe pod (events), kubectl logs (and --previous for last crash), check readiness/liveness probes, resource limits, image pull issues, and init containers.",
    explanation: "CrashLoopBackOff means the container keeps crashing and Kubernetes is backing off restarts. Common causes: app crash on startup, missing config/secrets, OOM kills, failed dependencies, wrong command/args, permission issues. Use `kubectl logs --previous` to see logs from last crashed instance. Check events for OOMKilled, ImagePullBackOff."
  },
  {
    id: 27, category: "Kubernetes", difficulty: "Junior",
    question: "What is kubectl and what are 5 essential kubectl commands?",
    answer: "kubectl is the CLI for Kubernetes. Essential commands: get, describe, apply, logs, exec.",
    explanation: "`kubectl get pods` - list pods. `kubectl describe pod <name>` - detailed info. `kubectl apply -f manifest.yaml` - create/update resources. `kubectl logs <pod>` - view logs. `kubectl exec -it <pod> -- /bin/sh` - shell into container. Also useful: `kubectl port-forward`, `kubectl top`, `kubectl rollout`."
  },
  {
    id: 28, category: "Kubernetes", difficulty: "Mid",
    question: "What is an Ingress controller and how does it differ from a Service?",
    answer: "An Ingress controller manages external HTTP/HTTPS access with path-based and host-based routing. Services handle L4 networking. Ingress adds L7 features like TLS termination and URL routing.",
    explanation: "The Ingress resource defines routing rules. An Ingress controller (Nginx, Traefik, ALB) implements them. This avoids needing one LoadBalancer Service per app. Features: virtual hosting, SSL/TLS, path rewrites, rate limiting. For non-HTTP traffic, use Service type LoadBalancer directly."
  },
  {
    id: 29, category: "Kubernetes", difficulty: "Senior",
    question: "How do you implement zero-downtime deployments in Kubernetes?",
    answer: "Use rolling updates with proper readiness probes, PodDisruptionBudgets, preStop hooks for graceful shutdown, and connection draining on the load balancer.",
    explanation: "Key pieces: 1) Readiness probe gates traffic until ready. 2) preStop hook + terminationGracePeriodSeconds allow in-flight requests to complete. 3) PodDisruptionBudget prevents too many pods going down simultaneously. 4) Container should handle SIGTERM gracefully. 5) Consider blue/green or canary strategies with Argo Rollouts or Flagger."
  },
  {
    id: 30, category: "Kubernetes", difficulty: "Mid",
    question: "What are ConfigMaps and Secrets, and how do they differ?",
    answer: "Both store configuration data. ConfigMaps store non-sensitive data. Secrets store sensitive data (base64 encoded). Both can be mounted as volumes or environment variables.",
    explanation: "Secrets are base64 encoded (not encrypted by default!). Enable encryption at rest in etcd for real security. Use external secret managers (Vault, AWS Secrets Manager) via external-secrets operator for production. ConfigMaps have a 1MB size limit. Both can be updated without restarting pods if mounted as volumes."
  },

  // ==================== Terraform (15) ====================
  {
    id: 31, category: "Terraform", difficulty: "Junior",
    question: "What is Terraform state and why is it important?",
    answer: "Terraform state is a JSON file that maps your configuration to real-world resources. It tracks resource IDs, dependencies, and metadata so Terraform knows what exists and what needs to change.",
    explanation: "State enables Terraform to: determine what to create, update, or destroy. Without state, Terraform can't map config to actual resources. Store state remotely (S3, GCS, Terraform Cloud) for team collaboration. Use state locking (DynamoDB) to prevent concurrent modifications."
  },
  {
    id: 32, category: "Terraform", difficulty: "Junior",
    question: "What is the difference between `terraform plan` and `terraform apply`?",
    answer: "`plan` shows what changes Terraform will make without executing them. `apply` actually creates, updates, or destroys infrastructure to match your configuration.",
    explanation: "Always run plan before apply to review changes. Plan output shows: + (create), ~ (update), - (destroy). Apply can take a saved plan file for safety: `terraform plan -out=tfplan && terraform apply tfplan`. Use -auto-approve cautiously (CI/CD only with proper safeguards)."
  },
  {
    id: 33, category: "Terraform", difficulty: "Junior",
    question: "What are Terraform providers and how do you configure them?",
    answer: "Providers are plugins that interact with APIs (AWS, GCP, Azure, etc.). Configure in a `provider` block with credentials and region. Declare required providers in `terraform` block.",
    explanation: "Providers manage the lifecycle of resources. Each resource type belongs to a provider. Version-pin providers for stability: `required_providers { aws = { source = \"hashicorp/aws\", version = \"~> 5.0\" } }`. Multiple provider instances using aliases for multi-region setups."
  },
  {
    id: 34, category: "Terraform", difficulty: "Mid",
    question: "Explain the difference between Terraform variables, locals, and outputs.",
    answer: "Variables are inputs (parameterize configs). Locals are computed intermediate values (reduce repetition). Outputs expose values to other modules or the CLI.",
    explanation: "Variables: declared with `variable` block, set via tfvars, CLI, or env vars. Locals: declared with `locals` block, good for computed values like tags. Outputs: declared with `output` block, useful for cross-module references and displaying results. Use validation blocks on variables for safety."
  },
  {
    id: 35, category: "Terraform", difficulty: "Mid",
    question: "How do Terraform modules work and when should you use them?",
    answer: "Modules are reusable packages of Terraform configs. Use them to encapsulate and standardize infrastructure patterns. Call with `module` block, pass variables in, get outputs out.",
    explanation: "Root module = your working directory. Child modules = referenced modules. Sources: local paths, Git repos, Terraform Registry. Best practices: version-pin modules, keep interfaces small, document with README. Use modules for: repeated patterns (VPC, EKS), enforcing standards, and managing complexity."
  },
  {
    id: 36, category: "Terraform", difficulty: "Mid",
    question: "What is `terraform import` and when would you use it?",
    answer: "It brings existing infrastructure under Terraform management by adding resources to state. Use it when you have manually-created resources you want to manage as code.",
    explanation: "Usage: `terraform import aws_instance.web i-1234567`. You must write the corresponding resource block first. Import only adds to state — it doesn't generate config (Terraform 1.5+ has import blocks with config generation). After import, run plan to verify the config matches the real resource."
  },
  {
    id: 37, category: "Terraform", difficulty: "Mid",
    question: "What is the difference between `count` and `for_each` in Terraform?",
    answer: "`count` creates multiple resources by index (integer). `for_each` creates resources from a map or set, using keys for identification. `for_each` is preferred because it's more stable when items change.",
    explanation: "With count, removing item at index 0 causes all subsequent resources to be recreated (index shift). With for_each, resources are keyed by map key — adding/removing one doesn't affect others. Use count for simple on/off (count = var.enabled ? 1 : 0). Use for_each for collections."
  },
  {
    id: 38, category: "Terraform", difficulty: "Senior",
    question: "How do you handle Terraform state drift, and what strategies prevent it?",
    answer: "Detect with `terraform plan` (shows unexpected changes). Prevent with: SCPs/policies blocking manual changes, regular drift detection runs, and educating teams to only change infra through Terraform.",
    explanation: "State drift = real infrastructure differs from state. Strategies: 1) Run plan on schedule (CI) to detect drift. 2) Use AWS Config or similar for change detection. 3) Use `terraform refresh` (now part of plan). 4) Import manually-created resources. 5) SCPs or Azure Policy to prevent console changes. Terraform Cloud has built-in drift detection."
  },
  {
    id: 39, category: "Terraform", difficulty: "Senior",
    question: "How would you structure Terraform for a large organization with multiple teams, environments, and AWS accounts?",
    answer: "Use a module monorepo for shared modules, separate state files per environment/account, remote backends with locking, and a CI/CD pipeline for plan/apply.",
    explanation: "Structure: modules/ (shared), environments/{dev,staging,prod}/ (root modules). Use workspaces or directory-per-env. Remote state in S3+DynamoDB per env. OIDC for CI auth. Terragrunt can reduce boilerplate. Use Terraform Cloud/Enterprise for governance. Pin module versions. PR-based workflow with plan output in comments."
  },
  {
    id: 40, category: "Terraform", difficulty: "Senior",
    question: "Explain Terraform's dependency graph and how it affects resource creation order.",
    answer: "Terraform builds a DAG (Directed Acyclic Graph) of all resources and their dependencies, then creates/updates resources in parallel where possible, respecting dependency order.",
    explanation: "Implicit dependencies: reference another resource's attribute (`aws_instance.web.id`). Explicit dependencies: `depends_on` for hidden dependencies. Terraform maximizes parallelism — independent resources are created concurrently. Use `-parallelism=N` flag to control. Circular dependencies cause errors and must be refactored."
  },
  {
    id: 41, category: "Terraform", difficulty: "Junior",
    question: "What file extension does Terraform use and what is HCL?",
    answer: "Terraform uses `.tf` files written in HCL (HashiCorp Configuration Language). HCL is a declarative language designed to be both human-readable and machine-friendly.",
    explanation: "HCL supports blocks, arguments, expressions, functions, and interpolation. You can also use JSON syntax (`.tf.json`). Key files: main.tf (resources), variables.tf (inputs), outputs.tf (outputs), providers.tf (provider config), terraform.tfvars (variable values). `.terraform.lock.hcl` locks provider versions."
  },
  {
    id: 42, category: "Terraform", difficulty: "Mid",
    question: "What are Terraform data sources and when would you use them?",
    answer: "Data sources read information from existing infrastructure or external sources without managing them. Use them to reference resources created outside Terraform or in other state files.",
    explanation: "Example: `data \"aws_ami\" \"latest\" { most_recent = true ... }` fetches the latest AMI ID. Common uses: looking up VPC IDs, AMIs, availability zones, DNS zones, account IDs. Data sources are read-only and refreshed on every plan. Unlike resources, Terraform doesn't manage their lifecycle."
  },
  {
    id: 43, category: "Terraform", difficulty: "Senior",
    question: "How do you safely rename or move a Terraform resource without destroying and recreating it?",
    answer: "Use `terraform state mv` to move a resource in state, or use the `moved` block (Terraform 1.1+) in your config for a declarative, reviewable approach.",
    explanation: "`moved { from = aws_instance.old_name, to = aws_instance.new_name }` — this is preferred because it's in code, goes through PR review, and applies automatically. `terraform state mv` is imperative and error-prone. For refactoring into modules, moved blocks handle cross-module moves too."
  },
  {
    id: 44, category: "Terraform", difficulty: "Senior",
    question: "What are the risks of `terraform destroy` and how do you protect critical resources?",
    answer: "Use `lifecycle { prevent_destroy = true }` on critical resources, implement state file backups, use approval gates in CI/CD, and separate long-lived resources into their own state.",
    explanation: "Additional protections: S3 bucket versioning for state files, MFA delete on state bucket, separate state for databases/VPCs (blast radius reduction), Sentinel/OPA policies to prevent destroying certain resource types, and always review plan output before apply. DeletionProtection on RDS/ALB adds another layer."
  },
  {
    id: 45, category: "Terraform", difficulty: "Junior",
    question: "What does `terraform init` do?",
    answer: "Initializes the working directory: downloads providers, initializes backend (state storage), downloads modules, and creates the `.terraform` directory.",
    explanation: "Run init when: first time in a directory, adding new providers/modules, changing backend config, or after upgrading Terraform. Use `-upgrade` to update providers/modules to latest allowed versions. The `.terraform.lock.hcl` file ensures consistent provider versions across team members."
  },

  // ==================== Docker (15) ====================
  {
    id: 46, category: "Docker", difficulty: "Junior",
    question: "What is the difference between a Docker image and a Docker container?",
    answer: "An image is a read-only template with application code, runtime, and dependencies. A container is a running instance of an image — an isolated process with its own filesystem, networking, and PID space.",
    explanation: "Images are built in layers (each Dockerfile instruction = a layer). Containers add a writable layer on top. You can create multiple containers from one image. Images are stored in registries (Docker Hub, ECR). Use `docker build` for images, `docker run` for containers."
  },
  {
    id: 47, category: "Docker", difficulty: "Junior",
    question: "What is a Dockerfile and what are the most common instructions?",
    answer: "A Dockerfile is a text file with instructions to build a Docker image. Common instructions: FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, ENV, EXPOSE, WORKDIR.",
    explanation: "FROM: base image. RUN: execute commands during build. COPY: copy files from host. WORKDIR: set working directory. ENV: set environment variables. EXPOSE: document ports. CMD: default command (overridable). ENTRYPOINT: fixed command. Use multi-stage builds for smaller images."
  },
  {
    id: 48, category: "Docker", difficulty: "Junior",
    question: "What is the difference between CMD and ENTRYPOINT in a Dockerfile?",
    answer: "ENTRYPOINT defines the main executable (hard to override). CMD provides default arguments to ENTRYPOINT (easily overridden). Together they form the container's command.",
    explanation: "ENTRYPOINT + CMD: `ENTRYPOINT [\"python\"] CMD [\"app.py\"]` → runs `python app.py`. Override CMD: `docker run myimage test.py` → runs `python test.py`. Override ENTRYPOINT: `docker run --entrypoint sh myimage`. Best practice: use ENTRYPOINT for the binary, CMD for default arguments."
  },
  {
    id: 49, category: "Docker", difficulty: "Mid",
    question: "How do you optimize Docker image size?",
    answer: "Use multi-stage builds, minimal base images (alpine/distroless), combine RUN commands, use .dockerignore, remove package manager caches, and order layers by change frequency.",
    explanation: "Multi-stage: build in one stage, copy only artifacts to final stage. Alpine saves 100s of MB vs Ubuntu. Combine RUN: `RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*`. Layer ordering: put rarely-changing layers first for cache efficiency. Distroless images have no shell — maximum security."
  },
  {
    id: 50, category: "Docker", difficulty: "Mid",
    question: "Explain Docker networking modes: bridge, host, and none.",
    answer: "Bridge: containers get private IPs on a virtual network (default). Host: container shares the host's network stack directly. None: no networking.",
    explanation: "Bridge is default — containers communicate via bridge network, port mapping (-p) for external access. Host removes network isolation but eliminates NAT overhead (good for performance). None for maximum isolation. Custom bridge networks enable DNS-based container discovery. Overlay networks span multiple Docker hosts (Swarm)."
  },
  {
    id: 51, category: "Docker", difficulty: "Mid",
    question: "What are Docker volumes and why should you use them instead of bind mounts?",
    answer: "Volumes are Docker-managed storage that persist beyond container lifecycle. They're better than bind mounts because Docker manages them, they work across platforms, they can use drivers for remote storage, and they're easier to back up.",
    explanation: "Volumes: `docker volume create mydata`, mount with `-v mydata:/app/data`. Bind mounts: mount host directory directly `-v /host/path:/container/path`. Volumes are stored in `/var/lib/docker/volumes/`. Use volumes for: databases, persistent state. Use bind mounts for: development (live code reload). tmpfs mounts: for sensitive data that shouldn't persist."
  },
  {
    id: 52, category: "Docker", difficulty: "Mid",
    question: "What is Docker Compose and when would you use it?",
    answer: "Docker Compose defines and runs multi-container applications using a YAML file. Use it for local development environments, testing, and simple multi-service deployments.",
    explanation: "Compose file defines services, networks, volumes, and dependencies. `docker compose up` starts everything. Features: service dependencies (depends_on), environment variables, port mapping, volume mounting, health checks. V2 is built into Docker CLI. Not recommended for production orchestration (use Kubernetes instead)."
  },
  {
    id: 53, category: "Docker", difficulty: "Senior",
    question: "How do you secure Docker containers in production?",
    answer: "Run as non-root, use read-only filesystem, drop capabilities, scan images for CVEs, use distroless/minimal images, limit resources, enable content trust, and use security profiles (seccomp, AppArmor).",
    explanation: "Checklist: 1) USER directive (non-root). 2) --read-only flag. 3) --cap-drop ALL, add only needed caps. 4) Scan with Trivy/Snyk. 5) Pin image digests, not tags. 6) --memory and --cpus limits. 7) No privileged mode. 8) seccomp profiles to restrict syscalls. 9) Don't store secrets in images. 10) Use Docker Content Trust for image signing."
  },
  {
    id: 54, category: "Docker", difficulty: "Senior",
    question: "Explain Docker layer caching and how it affects CI/CD build performance.",
    answer: "Docker caches each layer and reuses it if the instruction and context haven't changed. In CI/CD, leverage this with BuildKit cache mounts, registry-based caching (--cache-from), and proper layer ordering.",
    explanation: "Cache invalidation: if a layer changes, all subsequent layers are rebuilt. Strategy: COPY package.json first, RUN install, then COPY source code — dependencies are cached until package.json changes. In CI: `docker build --cache-from registry/image:latest`. BuildKit: `--mount=type=cache,target=/root/.cache/pip`. Multi-stage builds can cache builder stages separately."
  },
  {
    id: 55, category: "Docker", difficulty: "Senior",
    question: "What happens inside Docker when you run `docker run -d nginx`?",
    answer: "Docker: pulls image (if needed), creates container layer, sets up namespaces (PID, NET, MNT, UTS, IPC), configures cgroups for resource limits, sets up networking (bridge), and starts the process.",
    explanation: "Detailed flow: 1) Docker client sends request to daemon. 2) Daemon pulls image layers from registry. 3) Creates a thin writable container layer (union filesystem). 4) Allocates network interface and IP. 5) Creates Linux namespaces for isolation. 6) Sets cgroup limits. 7) Runs ENTRYPOINT/CMD as PID 1 in the container. 8) Container runtime (containerd/runc) manages the actual process."
  },
  {
    id: 56, category: "Docker", difficulty: "Junior",
    question: "What is the purpose of a .dockerignore file?",
    answer: "It excludes files and directories from the build context, reducing build time and image size, and preventing sensitive files from being included in images.",
    explanation: "Works like .gitignore. Common entries: .git, node_modules, *.md, .env, docker-compose.yml, .DS_Store. Without it, COPY . . sends everything to the daemon (including potentially huge directories like node_modules or .git). Always include a .dockerignore in projects with Docker."
  },
  {
    id: 57, category: "Docker", difficulty: "Mid",
    question: "How do you pass secrets to Docker containers securely?",
    answer: "Use Docker secrets (Swarm), environment variables from external secret managers, mounted volumes with secrets, or BuildKit secret mounts during build. Never bake secrets into images.",
    explanation: "Bad: ENV/ARG in Dockerfile (visible in image history). Better: runtime env vars (-e). Best: Docker secrets, Vault agent sidecar, AWS Secrets Manager with SDK, or Kubernetes secrets. For builds: `docker build --secret id=mysecret,src=./secret.txt` with BuildKit. Multi-stage builds prevent secrets from leaking to final image."
  },
  {
    id: 58, category: "Docker", difficulty: "Junior",
    question: "What is Docker Hub and what are the alternatives?",
    answer: "Docker Hub is the default public container registry. Alternatives: Amazon ECR, Google Artifact Registry, Azure ACR, GitHub Container Registry (ghcr.io), and self-hosted Harbor.",
    explanation: "Docker Hub: free for public images, rate-limited pulls (100/6h anonymous, 200/6h authenticated). ECR integrates with AWS IAM. GHCR integrates with GitHub Actions. Harbor adds vulnerability scanning and RBAC for self-hosted. Use private registries for proprietary images. Always use image signing and scanning in production."
  },
  {
    id: 59, category: "Docker", difficulty: "Senior",
    question: "Explain the difference between Docker's overlay2 and how union filesystems work.",
    answer: "overlay2 is Docker's default storage driver using Linux's OverlayFS. It layers multiple directories into a single unified view — lower layers are read-only, the upper layer is writable (copy-on-write).",
    explanation: "Each image layer is a lower directory. Container adds an upper (writable) directory. When a file is modified, it's copied from lower to upper (copy-on-write). Deletes create whiteout files. This makes layers efficient — shared base layers aren't duplicated. overlay2 replaced aufs/devicemapper for better performance. Understanding this explains why writing to containers is slower than volumes."
  },
  {
    id: 60, category: "Docker", difficulty: "Mid",
    question: "What is a multi-stage Docker build and why is it useful?",
    answer: "A multi-stage build uses multiple FROM statements. Build artifacts are compiled in one stage and copied to a minimal final stage, drastically reducing image size.",
    explanation: "Example: Stage 1 (builder) uses golang:1.21, compiles binary. Stage 2 uses scratch or alpine, copies only the binary. Result: image goes from 1GB+ to <20MB. Also useful for: separating test/lint stages, building frontend assets separately, keeping build tools out of production images. `COPY --from=builder /app/binary /app/binary`."
  },

  // ==================== Monitoring (14) ====================
  {
    id: 61, category: "Monitoring", difficulty: "Junior",
    question: "What are the four golden signals of monitoring?",
    answer: "Latency, Traffic, Errors, and Saturation (from Google's SRE book).",
    explanation: "Latency: time to service a request (separate successful vs failed). Traffic: demand on the system (requests/sec, sessions). Errors: rate of failed requests (explicit errors + wrong content + slow responses). Saturation: how 'full' the system is (CPU, memory, I/O — usually most constrained resource). These cover most monitoring needs."
  },
  {
    id: 62, category: "Monitoring", difficulty: "Junior",
    question: "What is the difference between monitoring, observability, and alerting?",
    answer: "Monitoring tracks predefined metrics. Observability enables exploring unknown issues from system outputs (logs, metrics, traces). Alerting notifies humans when conditions are met.",
    explanation: "Monitoring: 'Is the system healthy?' (dashboards, known metrics). Observability: 'Why is it broken?' (ad-hoc investigation using telemetry). Three pillars: metrics (numeric), logs (events), traces (request flows). Alerting should be actionable — alert on symptoms (high error rate), not causes (high CPU)."
  },
  {
    id: 63, category: "Monitoring", difficulty: "Junior",
    question: "What is Prometheus and how does it collect metrics?",
    answer: "Prometheus is an open-source monitoring system that uses a pull model — it scrapes HTTP endpoints (/metrics) on configured targets at regular intervals and stores time-series data.",
    explanation: "Components: Prometheus server (scrape, store, query), exporters (expose metrics), Alertmanager (route alerts), Grafana (visualization). Pull model: Prometheus fetches from targets (easier to detect if target is down). PromQL for querying. Service discovery for dynamic targets (Kubernetes, EC2). Stores data locally with configurable retention."
  },
  {
    id: 64, category: "Monitoring", difficulty: "Mid",
    question: "Explain the difference between RED and USE methods for monitoring.",
    answer: "RED (Rate, Errors, Duration) is for request-driven services. USE (Utilization, Saturation, Errors) is for resources (CPU, memory, disk, network).",
    explanation: "RED: good for microservices — rate of requests, error rate, duration distribution. USE: good for infrastructure — utilization (% busy), saturation (queue depth), errors (error count). Use RED for your API endpoints, USE for your hosts/nodes. Together they provide comprehensive coverage of both application and infrastructure health."
  },
  {
    id: 65, category: "Monitoring", difficulty: "Mid",
    question: "What are SLIs, SLOs, and SLAs, and how do they relate?",
    answer: "SLI (Service Level Indicator): a metric measuring service quality. SLO (Service Level Objective): target value for an SLI. SLA (Service Level Agreement): contract with consequences if SLO is breached.",
    explanation: "Example: SLI = % of requests completing in <200ms. SLO = 99.9% of requests must meet that SLI. SLA = if SLO is breached, customer gets credits. Error budget = 100% - SLO (e.g., 0.1% allowed failures). Track SLOs with burn rate alerts (how fast are you consuming error budget?). Set SLOs based on user expectations, not technical capability."
  },
  {
    id: 66, category: "Monitoring", difficulty: "Mid",
    question: "How does distributed tracing work and when do you need it?",
    answer: "Distributed tracing follows a request across multiple services by propagating a trace ID through headers. Each service creates spans (timed operations) that form a trace tree.",
    explanation: "Tools: Jaeger, Zipkin, AWS X-Ray, Datadog APT, OpenTelemetry. A trace = collection of spans. Each span has: operation name, start/end time, tags, parent span ID. Propagation: typically via HTTP headers (traceparent in W3C format). Essential for microservices to identify latency bottlenecks, error sources, and dependency issues."
  },
  {
    id: 67, category: "Monitoring", difficulty: "Mid",
    question: "What is Grafana and how does it work with Prometheus?",
    answer: "Grafana is a visualization platform that queries data sources like Prometheus to create dashboards. It supports PromQL queries, alerting, annotations, and variables for dynamic dashboards.",
    explanation: "Setup: add Prometheus as a data source, create dashboards with panels. Features: templated dashboards (variables for namespace, service), alert rules with notification channels (Slack, PagerDuty), annotations for deployments. Pre-built dashboards from grafana.com. Supports multiple data sources: Prometheus, Loki, Elasticsearch, CloudWatch, etc."
  },
  {
    id: 68, category: "Monitoring", difficulty: "Senior",
    question: "How would you design an alerting strategy that minimizes alert fatigue?",
    answer: "Alert on symptoms not causes, use multi-window burn rates for SLOs, implement severity levels, deduplicate and group alerts, require runbooks for every alert, and regularly review alert quality.",
    explanation: "Principles: 1) Every alert must be actionable. 2) Use SLO-based alerts (burn rate > threshold). 3) Severity: page (P1) vs ticket (P2) vs log (P3). 4) Group related alerts (Alertmanager grouping). 5) Silence during maintenance. 6) Review: if an alert fires and no one acts, delete it. 7) On-call rotation with escalation. Google SRE: if it doesn't require human intelligence, automate the response."
  },
  {
    id: 69, category: "Monitoring", difficulty: "Senior",
    question: "Explain the OpenTelemetry project and its role in modern observability.",
    answer: "OpenTelemetry (OTel) is a vendor-neutral standard for collecting telemetry data — metrics, logs, and traces. It provides APIs, SDKs, and a Collector for instrumenting, generating, and exporting telemetry.",
    explanation: "Components: API (interfaces), SDK (implementation), Collector (receive, process, export), protocol (OTLP). The Collector can receive from multiple sources and export to multiple backends (Prometheus, Jaeger, Datadog, etc.). Auto-instrumentation available for many languages. Merged from OpenTracing and OpenCensus. Becoming the de facto standard for telemetry."
  },
  {
    id: 70, category: "Monitoring", difficulty: "Senior",
    question: "How would you monitor a Kubernetes cluster end-to-end?",
    answer: "Infrastructure: node-exporter + kube-state-metrics → Prometheus → Grafana. Applications: OpenTelemetry SDK → traces/metrics. Logs: Fluent Bit/Fluentd → Loki/Elasticsearch. Alerts: Alertmanager → PagerDuty/Slack.",
    explanation: "Layers to monitor: 1) Node health (CPU, memory, disk, network). 2) Kubernetes objects (pod status, restarts, pending pods). 3) Control plane (API server latency, etcd). 4) Application metrics (RED method). 5) Application logs (structured JSON). 6) Distributed traces for request flows. Use kube-prometheus-stack Helm chart for quick setup. Monitor monitoring itself (meta-monitoring)."
  },
  {
    id: 71, category: "Monitoring", difficulty: "Junior",
    question: "What is the difference between structured and unstructured logging?",
    answer: "Structured logs use a consistent format (usually JSON) with key-value pairs. Unstructured logs are free-text strings. Structured logs are much easier to search, filter, and analyze.",
    explanation: "Unstructured: `Error processing order 1234 for user john`. Structured: `{\"level\":\"error\",\"msg\":\"processing_failed\",\"order_id\":1234,\"user\":\"john\",\"duration_ms\":45}`. Benefits of structured: machine-parseable, queryable fields, consistent format, easier aggregation. Use structured logging libraries (winston, zap, logrus) in production."
  },
  {
    id: 72, category: "Monitoring", difficulty: "Mid",
    question: "What are metric types in Prometheus: Counter, Gauge, Histogram, and Summary?",
    answer: "Counter: monotonically increasing (requests total). Gauge: can go up and down (temperature, active connections). Histogram: buckets of observations (request duration). Summary: pre-calculated quantiles.",
    explanation: "Counter: use rate() to get per-second rate. Never decreases (except reset). Gauge: current value, use for memory, queue size. Histogram: pre-defined buckets, can compute percentiles server-side with histogram_quantile(). Summary: calculates quantiles client-side, not aggregatable across instances. Prefer histograms for latency measurement."
  },
  {
    id: 73, category: "Monitoring", difficulty: "Senior",
    question: "How do you implement SLO-based burn rate alerting?",
    answer: "Calculate error budget consumption rate over multiple time windows. Alert when the burn rate exceeds a threshold that would exhaust the error budget before the SLO period ends.",
    explanation: "Multi-window approach: fast-burn (high rate, short window: 5min) for severe incidents + slow-burn (low rate, long window: 6h) for gradual degradation. Example with 99.9% SLO (30-day): burn rate 14.4x over 1h = alert (would exhaust budget in 2 days). Use both short and long windows to reduce false positives. Google's approach uses 2% budget consumed in 1h OR 5% in 6h."
  },
  {
    id: 74, category: "Monitoring", difficulty: "Mid",
    question: "What is log aggregation and why is it important in distributed systems?",
    answer: "Log aggregation collects logs from all services/hosts into a centralized system for unified search, analysis, and correlation. Essential because distributed systems generate logs across many sources.",
    explanation: "Stack examples: ELK (Elasticsearch, Logstash, Kibana), EFK (Elasticsearch, Fluentd, Kibana), Grafana Loki + Promtail, Datadog Logs. Key features: full-text search, filtering by service/level/time, correlation with trace IDs, retention policies, alerting on log patterns. Ship logs as JSON for better indexing. Use log levels consistently (DEBUG, INFO, WARN, ERROR)."
  },

  // ==================== Networking (14) ====================
  {
    id: 75, category: "Networking", difficulty: "Junior",
    question: "What is the difference between TCP and UDP?",
    answer: "TCP is connection-oriented, reliable, and ordered (uses handshake, acknowledgments, retransmission). UDP is connectionless, unreliable, and unordered (fire-and-forget, lower latency).",
    explanation: "TCP: HTTP, SSH, databases — need reliable delivery. UDP: DNS, video streaming, gaming — need speed over reliability. TCP overhead: 3-way handshake, sequence numbers, acks, flow control, congestion control. UDP overhead: minimal 8-byte header. Modern protocols like QUIC (HTTP/3) build reliability on top of UDP for better performance."
  },
  {
    id: 76, category: "Networking", difficulty: "Junior",
    question: "What is DNS and how does a DNS lookup work?",
    answer: "DNS translates domain names to IP addresses. Lookup flow: browser cache → OS cache → recursive resolver → root nameserver → TLD nameserver → authoritative nameserver → returns IP.",
    explanation: "Record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (verification), NS (nameserver), SOA (authority). TTL controls caching duration. Recursive resolver does the work (usually ISP or 8.8.8.8/1.1.1.1). DNS can be a bottleneck and attack vector (DNS poisoning, DDoS). Use DNS for load balancing (multiple A records, Route 53 weighted routing)."
  },
  {
    id: 77, category: "Networking", difficulty: "Junior",
    question: "What is the difference between HTTP and HTTPS?",
    answer: "HTTPS adds TLS/SSL encryption to HTTP. It encrypts data in transit, verifies server identity (certificates), and ensures data integrity. Uses port 443 vs HTTP's port 80.",
    explanation: "TLS handshake: client hello → server hello + cert → key exchange → encrypted session. Certificates: issued by CAs (Certificate Authorities), verified by browser trust store. Let's Encrypt provides free certs. HTTPS prevents: eavesdropping, man-in-the-middle attacks, data tampering. Modern web: HTTPS is mandatory (browsers flag HTTP as insecure, SEO penalty)."
  },
  {
    id: 78, category: "Networking", difficulty: "Mid",
    question: "Explain the OSI model layers and name a protocol for each.",
    answer: "7-Application (HTTP), 6-Presentation (SSL/TLS), 5-Session (NetBIOS), 4-Transport (TCP/UDP), 3-Network (IP), 2-Data Link (Ethernet), 1-Physical (cables/radio).",
    explanation: "Practical DevOps focus: Layer 3 (IP routing, subnets, VPCs), Layer 4 (TCP/UDP, NLB, security groups), Layer 7 (HTTP, ALB, WAF, API gateways). Troubleshooting: L1-physical (is it plugged in?), L3 (can you ping?), L4 (is the port open?), L7 (is the app responding correctly?). Most DevOps work happens at L3, L4, and L7."
  },
  {
    id: 79, category: "Networking", difficulty: "Mid",
    question: "What is a CIDR block and how does subnetting work?",
    answer: "CIDR (Classless Inter-Domain Routing) notation defines IP ranges. /24 = 256 IPs, /16 = 65,536 IPs. Subnetting divides a network into smaller segments for isolation and routing efficiency.",
    explanation: "10.0.0.0/16 = 10.0.0.0 to 10.0.255.255. Subnet into: 10.0.1.0/24 (public), 10.0.2.0/24 (private), etc. Each /24 = 256 IPs (AWS reserves 5). Common VPC pattern: /16 VPC with /24 subnets per AZ. Private subnets use NAT gateway for outbound internet. Public subnets have route to Internet Gateway. Understanding CIDR is essential for VPC design."
  },
  {
    id: 80, category: "Networking", difficulty: "Mid",
    question: "What is a reverse proxy and how does it differ from a forward proxy?",
    answer: "A forward proxy acts on behalf of clients (hides client identity). A reverse proxy acts on behalf of servers (hides server identity). Reverse proxies handle load balancing, SSL, caching, and routing.",
    explanation: "Forward proxy: client → proxy → internet (corporate firewalls, VPNs). Reverse proxy: internet → proxy → backend servers (Nginx, HAProxy, ALB). Reverse proxy benefits: load balancing, SSL termination, caching, compression, rate limiting, security (hide backend topology). Common in: Kubernetes Ingress, CDNs, API gateways."
  },
  {
    id: 81, category: "Networking", difficulty: "Mid",
    question: "What is a CDN and how does it improve performance?",
    answer: "A Content Delivery Network caches content at edge locations worldwide, reducing latency by serving users from the nearest geographic location instead of the origin server.",
    explanation: "How it works: first request goes to origin, response is cached at edge. Subsequent requests served from cache. Benefits: lower latency, reduced origin load, DDoS protection, SSL/TLS at edge. Providers: CloudFront, Cloudflare, Akamai, Fastly. Cache invalidation is the hard part. Use versioned URLs or cache-busting for static assets."
  },
  {
    id: 82, category: "Networking", difficulty: "Senior",
    question: "How does TLS 1.3 handshake differ from TLS 1.2?",
    answer: "TLS 1.3 completes in 1 round-trip (1-RTT) vs TLS 1.2's 2 round-trips. It supports 0-RTT resumption, removes insecure cipher suites, and mandates perfect forward secrecy.",
    explanation: "TLS 1.2: ClientHello → ServerHello+Cert → KeyExchange → Finished (2-RTT). TLS 1.3: ClientHello(+KeyShare) → ServerHello(+KeyShare)+Cert+Finished → Finished (1-RTT). Removed: RSA key exchange, static DH, CBC, RC4, SHA-1, compression. Only AEAD ciphers (AES-GCM, ChaCha20). 0-RTT: send data with first message on resumption (replay risk)."
  },
  {
    id: 83, category: "Networking", difficulty: "Senior",
    question: "Explain how a service mesh works and when you'd implement one.",
    answer: "A service mesh uses sidecar proxies (e.g., Envoy) alongside each service to handle inter-service communication — providing mTLS, traffic management, observability, and retries without code changes.",
    explanation: "Data plane: sidecar proxies intercept all traffic. Control plane: configures proxies (Istio, Linkerd, Consul Connect). Features: mutual TLS (zero-trust), circuit breaking, retries, timeouts, traffic splitting (canary), distributed tracing. When to use: many microservices, need mTLS everywhere, complex traffic routing. When not: adds complexity and latency; consider if <10 services."
  },
  {
    id: 84, category: "Networking", difficulty: "Senior",
    question: "How would you troubleshoot a network connectivity issue between two services in Kubernetes?",
    answer: "Systematic approach: DNS resolution → Pod IP connectivity → port reachability → service endpoint registration → network policy rules → CNI plugin health.",
    explanation: "Steps: 1) `kubectl exec` into pod, `nslookup service-name`. 2) Check if pod IPs are assigned and routable. 3) `curl/nc` to target pod IP:port. 4) Verify Service endpoints: `kubectl get endpoints`. 5) Check NetworkPolicies (deny-all might block). 6) Check CNI pod health (calico-node, cilium). 7) Check kube-proxy/iptables rules. 8) Node-level: check routing tables, security groups."
  },
  {
    id: 85, category: "Networking", difficulty: "Junior",
    question: "What are common HTTP status codes and what do they mean?",
    answer: "200 (OK), 201 (Created), 301 (Moved Permanently), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error), 502 (Bad Gateway), 503 (Service Unavailable).",
    explanation: "Ranges: 1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error. DevOps-relevant: 429 (rate limited), 502 (proxy got bad response from upstream), 503 (service overloaded/maintenance), 504 (gateway timeout). Monitor 5xx rates as key SLI. 4xx can indicate client issues or API problems."
  },
  {
    id: 86, category: "Networking", difficulty: "Mid",
    question: "What is a VPN and how does site-to-site VPN differ from client VPN?",
    answer: "VPN creates an encrypted tunnel over the internet. Site-to-site connects two networks (e.g., office to AWS VPC). Client VPN connects individual users to a network.",
    explanation: "Site-to-site: always-on tunnel between network gateways (IPsec). AWS: Virtual Private Gateway + Customer Gateway. Client VPN: users install VPN client, connect on-demand (OpenVPN, WireGuard). AWS Client VPN: managed service for user access to VPCs. Alternatives: AWS Direct Connect (dedicated physical connection), Transit Gateway for hub-and-spoke."
  },
  {
    id: 87, category: "Networking", difficulty: "Senior",
    question: "Explain BGP (Border Gateway Protocol) and its role in cloud networking.",
    answer: "BGP is the routing protocol that makes the internet work — it exchanges routing information between autonomous systems. In cloud, it's used for Direct Connect, Transit Gateway, and CNI plugins like Calico.",
    explanation: "BGP selects the best path based on policies (AS path length, local preference, MED). eBGP: between different ASes. iBGP: within an AS. AWS: Direct Connect uses BGP to advertise on-prem routes to VPC and vice versa. Calico uses BGP to distribute pod routes across nodes (avoiding overlay overhead). Understanding BGP helps debug routing issues in hybrid architectures."
  },
  {
    id: 88, category: "Networking", difficulty: "Mid",
    question: "What is NAT (Network Address Translation) and what is a NAT Gateway in AWS?",
    answer: "NAT translates private IPs to public IPs, enabling private network resources to access the internet. AWS NAT Gateway is a managed service that provides outbound internet access for private subnets.",
    explanation: "Without NAT, instances in private subnets can't reach the internet (for updates, API calls). NAT Gateway sits in a public subnet with an Elastic IP. Private subnet route table: 0.0.0.0/0 → NAT Gateway. NAT Gateway is AZ-specific — deploy one per AZ for high availability. Costs: per-hour + per-GB processed. Alternative: NAT Instance (cheaper, self-managed, less reliable)."
  },

  // ==================== Security (14) ====================
  {
    id: 89, category: "Security", difficulty: "Junior",
    question: "What is the principle of least privilege and how do you apply it?",
    answer: "Grant only the minimum permissions needed for a task. Apply it to: IAM policies, network access (security groups), database users, API keys, and container capabilities.",
    explanation: "Implementation: start with zero access, add permissions as needed. Use IAM policy conditions (IP, MFA, time). Regular access reviews. Temporary credentials (STS assume role) over long-lived keys. Avoid wildcards (*) in policies. Use AWS Access Analyzer to identify unused permissions. Principle applies to humans AND services."
  },
  {
    id: 90, category: "Security", difficulty: "Junior",
    question: "What is encryption at rest vs encryption in transit?",
    answer: "At rest: data is encrypted when stored (disk, S3, database). In transit: data is encrypted during transmission (TLS/SSL, VPN, HTTPS). Both protect against different threat vectors.",
    explanation: "At rest: protects against physical theft, unauthorized disk access. Use: AES-256, KMS-managed keys. In transit: protects against eavesdropping, MITM attacks. Use: TLS 1.2+, certificate verification. AWS: S3 encryption (SSE-S3, SSE-KMS, SSE-C), EBS encryption, RDS encryption. Always enable both. Some compliance frameworks (HIPAA, PCI) require both."
  },
  {
    id: 91, category: "Security", difficulty: "Junior",
    question: "What is multi-factor authentication (MFA) and why is it critical for DevOps?",
    answer: "MFA requires two or more verification factors: something you know (password), something you have (token/phone), something you are (biometrics). Critical because compromised credentials are the #1 attack vector.",
    explanation: "Enforce MFA: AWS root account (mandatory), IAM users, VPN access, git platforms. IAM policy condition: `aws:MultiFactorAuthPresent`. Types: virtual MFA (Authenticator app), hardware token (YubiKey), SMS (least secure — SIM swapping). For CI/CD: use OIDC federation instead of long-lived credentials. MFA prevents: credential stuffing, phishing, leaked passwords."
  },
  {
    id: 92, category: "Security", difficulty: "Mid",
    question: "Explain the concept of zero trust security and how it applies to DevOps.",
    answer: "Zero trust means 'never trust, always verify' — every request is authenticated and authorized regardless of network location. No implicit trust based on being inside a network perimeter.",
    explanation: "Principles: verify identity, validate device health, least privilege access, micro-segmentation. DevOps application: service mesh with mTLS, identity-based access (BeyondCorp), network policies in K8s, short-lived credentials, API gateway auth for all services. Replaces VPN-based perimeter security. Tools: Istio, HashiCorp Boundary, Cloudflare Access, Tailscale."
  },
  {
    id: 93, category: "Security", difficulty: "Mid",
    question: "How do you manage secrets in a CI/CD pipeline?",
    answer: "Use a secrets manager (Vault, AWS Secrets Manager, GitHub Secrets), inject at runtime, never store in code/commits, use short-lived credentials, and rotate regularly.",
    explanation: "Bad practices: hardcoded in code, .env in git, plaintext in CI config. Good practices: GitHub Actions secrets (encrypted), Vault with dynamic secrets (generate DB credentials on demand), OIDC for cloud auth (no stored AWS keys), sealed secrets in Kubernetes. git-secrets or gitleaks to prevent accidental commits. Rotate secrets after any suspected leak."
  },
  {
    id: 94, category: "Security", difficulty: "Mid",
    question: "What is a WAF (Web Application Firewall) and what attacks does it prevent?",
    answer: "A WAF filters and monitors HTTP traffic between the web and your application. It prevents: SQL injection, XSS, CSRF, DDoS (L7), bot attacks, and OWASP Top 10 vulnerabilities.",
    explanation: "WAFs inspect request content (headers, body, query params) against rules. AWS WAF: attached to ALB, CloudFront, or API Gateway. Rule types: rate-based (DDoS), geo-match, IP reputation, managed rule groups (OWASP core), custom rules. WAF vs Security Group: WAF is L7 (application), SG is L3/L4 (network). Use both for defense in depth."
  },
  {
    id: 95, category: "Security", difficulty: "Mid",
    question: "What is container image scanning and why is it important?",
    answer: "Scanning analyzes container images for known vulnerabilities (CVEs), misconfigurations, malware, and exposed secrets. Important because base images often contain vulnerable packages.",
    explanation: "Tools: Trivy, Snyk, Grype, AWS ECR scanning, Docker Scout. Integrate into: CI/CD pipeline (fail build on critical CVEs), registry (scan on push), runtime (continuous scanning). Check: OS packages, application dependencies, Dockerfile best practices (no root, no secrets). Keep base images updated. Use minimal images (distroless, alpine) to reduce attack surface."
  },
  {
    id: 96, category: "Security", difficulty: "Senior",
    question: "How would you implement a security incident response plan for a cloud-native environment?",
    answer: "Preparation (runbooks, tools), Detection (monitoring, alerts), Containment (isolate affected resources), Eradication (remove threat), Recovery (restore services), Lessons Learned (post-mortem).",
    explanation: "Cloud-specific: 1) Preparation: CloudTrail enabled, VPC flow logs, GuardDuty, Detective. 2) Detection: automated alerts on suspicious activity (unusual API calls, credential use from new IP). 3) Containment: revoke credentials, isolate with security groups, snapshot for forensics. 4) Eradication: patch, rebuild from clean images. 5) Recovery: deploy from known-good state. 6) Post-mortem: blameless, action items, timeline."
  },
  {
    id: 97, category: "Security", difficulty: "Senior",
    question: "Explain RBAC in Kubernetes and how you'd design it for a multi-team cluster.",
    answer: "RBAC uses Roles (namespace-scoped permissions), ClusterRoles (cluster-wide), RoleBindings, and ClusterRoleBindings to control who can do what. Design with namespace-per-team and least privilege.",
    explanation: "Pattern: namespace per team, Role per function (developer: get/list/logs, deployer: create/update, admin: full namespace access). Use ClusterRoles for cluster-wide resources (nodes, PVs). Bind to Groups from identity provider (OIDC). Avoid cluster-admin for regular users. Audit with `kubectl auth can-i --list`. Use OPA/Gatekeeper for policy enforcement beyond RBAC (e.g., no privileged containers)."
  },
  {
    id: 98, category: "Security", difficulty: "Senior",
    question: "What is supply chain security for containers and how do you implement it?",
    answer: "Verifying the integrity and provenance of container images, base images, and dependencies throughout the build and deployment pipeline. Implement with image signing, SBOM, and admission controllers.",
    explanation: "Tools: cosign (image signing), Syft (SBOM generation), SLSA framework (build provenance), Kyverno/OPA (admission policies). Pipeline: 1) Pin base images by digest. 2) Sign images after build (cosign). 3) Generate SBOM. 4) Scan for vulnerabilities. 5) Admission controller verifies signatures before deployment. 6) Continuously scan running images. SLSA levels provide increasing build integrity guarantees."
  },
  {
    id: 99, category: "Security", difficulty: "Senior",
    question: "How would you implement secrets rotation with zero downtime?",
    answer: "Use dual-secret support: application reads both old and new secrets. Rotation steps: create new secret → update app config → verify → revoke old secret. Automate with Vault dynamic secrets or AWS Secrets Manager rotation.",
    explanation: "Strategies: 1) AWS Secrets Manager: Lambda-based rotation, multi-user rotation for RDS. 2) Vault dynamic secrets: generate unique, short-lived credentials per request. 3) Kubernetes: external-secrets operator syncs from secret manager, app watches for changes. Key: application must handle credential refresh gracefully (connection pooling with retry). Test rotation in staging first."
  },
  {
    id: 100, category: "Security", difficulty: "Junior",
    question: "What is SSH and how do you use SSH keys for secure access?",
    answer: "SSH (Secure Shell) provides encrypted remote access. Key-based auth uses a key pair: private key (kept secret) and public key (placed on server). More secure than passwords.",
    explanation: "Generate: `ssh-keygen -t ed25519`. Public key goes in server's ~/.ssh/authorized_keys. Never share private key. Use ssh-agent to manage keys. Best practices: passphrase-protect private keys, use ed25519 (modern) over RSA, disable password auth, use bastion hosts/jump boxes, consider SSH certificates for large-scale. AWS: use Session Manager instead of direct SSH."
  },
  {
    id: 101, category: "Security", difficulty: "Mid",
    question: "What is the difference between authentication and authorization?",
    answer: "Authentication verifies WHO you are (identity). Authorization determines WHAT you can do (permissions). Authentication always comes first.",
    explanation: "Authentication methods: passwords, MFA, certificates, tokens (JWT), OIDC/SAML. Authorization methods: RBAC, ABAC (attribute-based), ACLs, policies (IAM, OPA). Example: OAuth 2.0 for authorization, OIDC (on top of OAuth) for authentication. In Kubernetes: authentication via certificates/OIDC, authorization via RBAC. In AWS: authentication via credentials/STS, authorization via IAM policies."
  },
  {
    id: 102, category: "Security", difficulty: "Senior",
    question: "How do you implement network segmentation and micro-segmentation in a cloud environment?",
    answer: "Network segmentation: VPCs, subnets, NACLs. Micro-segmentation: security groups per workload, Kubernetes network policies, service mesh mTLS. Defense in depth at every layer.",
    explanation: "Layers: 1) VPC isolation (separate VPCs for prod/staging). 2) Subnet tiers (public/private/database). 3) Security groups (per-service, least privilege). 4) K8s NetworkPolicies (deny-all default, allow specific). 5) Service mesh (mTLS between services). Benefits: blast radius reduction, compliance (PCI DSS requires segmentation), lateral movement prevention. Tools: Calico, Cilium, AWS Firewall Manager."
  }
];

// Category icons mapping
const CATEGORY_ICONS = {
    "AWS": "☁️",
    "Kubernetes": "☸️",
    "Terraform": "🏗️",
    "Docker": "🐳",
    "Monitoring": "📊",
    "Networking": "🌐",
    "Security": "🔒"
};

// Free tier card limit
const FREE_CARD_LIMIT = 20;
