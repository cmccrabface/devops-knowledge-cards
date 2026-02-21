// DevOps Knowledge Cards - Question Database
const QUESTIONS = [
    // AWS Questions (20)
    {
        id: 1,
        category: "AWS",
        difficulty: "Junior",
        question: "You need to host a static website. Which AWS service should you use and why?",
        answer: "Amazon S3 with Static Website Hosting enabled",
        explanation: "S3 is cost-effective, scales automatically, and can be combined with CloudFront for global CDN. No servers to manage. Perfect for HTML/CSS/JS sites."
    },
    {
        id: 2,
        category: "AWS",
        difficulty: "Mid",
        question: "Your EC2 instance needs to access S3 buckets. What's the most secure way to grant permissions?",
        answer: "Attach an IAM Role to the EC2 instance",
        explanation: "IAM Roles provide temporary credentials that rotate automatically. Never hardcode AWS keys in your instance or application code. Roles are the AWS best practice for EC2-to-AWS-service authentication."
    },
    {
        id: 3,
        category: "AWS",
        difficulty: "Senior",
        question: "Your application's RDS database is experiencing high read load. What are three strategies to improve performance?",
        answer: "1) Add Read Replicas, 2) Implement ElastiCache (Redis/Memcached), 3) Optimize queries and add database indexes",
        explanation: "Read Replicas offload read traffic from the primary. ElastiCache reduces database hits for frequently accessed data. Query optimization (EXPLAIN, indexes) reduces load at the source."
    },
    {
        id: 4,
        category: "AWS",
        difficulty: "Mid",
        question: "What's the difference between a Security Group and a Network ACL?",
        answer: "Security Groups are stateful (return traffic auto-allowed) and work at instance level. NACLs are stateless (must explicitly allow return traffic) and work at subnet level.",
        explanation: "Security Groups act like instance firewalls. NACLs are subnet-level. Security Groups only support allow rules; NACLs support both allow and deny. Most teams rely on Security Groups and use NACLs as a second layer."
    },
    {
        id: 5,
        category: "AWS",
        difficulty: "Junior",
        question: "What is an AWS VPC?",
        answer: "Virtual Private Cloud - an isolated virtual network where you launch AWS resources",
        explanation: "VPC lets you define your own network: IP ranges (CIDR), subnets, route tables, internet/NAT gateways. It's your private data center in AWS."
    },
    {
        id: 6,
        category: "AWS",
        difficulty: "Senior",
        question: "How would you design a highly available, multi-region web application on AWS?",
        answer: "Use Route 53 for DNS with failover/geolocation routing, deploy to multiple regions with ALB + Auto Scaling Groups, replicate RDS with cross-region read replicas, use S3 cross-region replication for assets, CloudFront for global CDN",
        explanation: "Multi-region = resilience to regional outages. Route 53 handles DNS failover. Each region has full stack (compute, DB, storage). S3 + CloudFront ensure asset availability globally."
    },
    {
        id: 7,
        category: "AWS",
        difficulty: "Mid",
        question: "Your Auto Scaling Group isn't scaling up despite high CPU. What should you check?",
        answer: "1) Scaling policy configuration (threshold, metric), 2) Service limits (max instances), 3) Cooldown period settings, 4) CloudWatch alarm state",
        explanation: "Common issues: threshold not reached, cooldown period preventing scale, hitting account limits, or alarm not triggering. Check CloudWatch metrics first."
    },
    {
        id: 8,
        category: "AWS",
        difficulty: "Junior",
        question: "What's the difference between S3 Standard and S3 Glacier?",
        answer: "S3 Standard is for frequently accessed data (millisecond access). Glacier is for archival (minutes to hours retrieval, much cheaper storage).",
        explanation: "Standard: instant access, higher cost. Glacier: long-term archive, low cost, retrieval delay. Use Lifecycle Policies to automatically transition objects based on age."
    },
    {
        id: 9,
        category: "AWS",
        difficulty: "Mid",
        question: "How do you troubleshoot an EC2 instance that won't connect via SSH?",
        answer: "1) Check Security Group (port 22 open), 2) Verify key pair, 3) Check NACL rules, 4) Confirm instance is running, 5) Check route table/internet gateway if public, 6) Review system logs in console",
        explanation: "Work through layers: Security Group → NACL → routing → instance state → OS-level (logs). Most issues are Security Group misconfigurations."
    },
    {
        id: 10,
        category: "AWS",
        difficulty: "Senior",
        question: "Explain the difference between ALB, NLB, and CLB. When would you use each?",
        answer: "ALB (Application): Layer 7, HTTP/HTTPS, path/host routing, WebSockets. NLB (Network): Layer 4, ultra-high performance, static IPs, TCP/UDP. CLB (Classic): Legacy, avoid for new apps.",
        explanation: "ALB for web apps (routing, SSL, WAF integration). NLB for extreme performance, non-HTTP protocols, or when you need static IPs. CLB is deprecated - migrate to ALB/NLB."
    },
    {
        id: 11,
        category: "AWS",
        difficulty: "Mid",
        question: "Your Lambda function times out after 3 seconds. What can you do?",
        answer: "Increase the timeout setting (max 15 minutes), optimize code performance, increase memory (also increases CPU), or split into smaller functions",
        explanation: "Lambda timeout is configurable (1 sec to 15 min). More memory = more CPU. Profile your code to find bottlenecks. For longer jobs, consider ECS/Fargate."
    },
    {
        id: 12,
        category: "AWS",
        difficulty: "Junior",
        question: "What is AWS CloudFormation?",
        answer: "Infrastructure as Code (IaC) service - define AWS resources in JSON/YAML templates and deploy them as a stack",
        explanation: "CloudFormation lets you version control infrastructure, deploy consistently, and tear down cleanly. Stack = collection of resources managed together."
    },
    {
        id: 13,
        category: "AWS",
        difficulty: "Mid",
        question: "How does AWS Cost Explorer help reduce cloud costs?",
        answer: "It visualizes spending over time, breaks down costs by service/tag, forecasts future spend, and identifies optimization opportunities like Reserved Instance recommendations",
        explanation: "Cost Explorer shows where money goes. Use it to find unused resources, right-size instances, and plan Reserved Instances. Tag resources for better cost attribution."
    },
    {
        id: 14,
        category: "AWS",
        difficulty: "Senior",
        question: "Design a disaster recovery strategy for a critical application with RPO of 1 hour and RTO of 4 hours.",
        answer: "Use multi-region active-passive: primary region with continuous RDS backups + transaction logs to S3 (1hr RPO), automated CloudFormation stack in secondary region (standby), use Route 53 health checks for failover. Test quarterly.",
        explanation: "RPO 1hr = can lose max 1hr of data → hourly snapshots + transaction log shipping. RTO 4hr = recover within 4hr → pre-built AMIs, tested runbooks, automated deployment. Active-passive cheaper than active-active."
    },
    {
        id: 15,
        category: "AWS",
        difficulty: "Mid",
        question: "What's the difference between horizontal and vertical scaling?",
        answer: "Horizontal (scale out): add more instances. Vertical (scale up): increase instance size (CPU/RAM). Horizontal is more resilient and AWS-friendly.",
        explanation: "Horizontal scaling provides fault tolerance (one instance fails, others continue). Vertical scaling has limits and requires downtime. Auto Scaling Groups enable horizontal scaling."
    },
    {
        id: 16,
        category: "AWS",
        difficulty: "Junior",
        question: "What is the AWS Shared Responsibility Model?",
        answer: "AWS manages security OF the cloud (hardware, facilities, network). Customer manages security IN the cloud (data, applications, IAM, OS patches).",
        explanation: "AWS handles infrastructure. You handle: access control, encryption, patching, application security, data classification. It's a partnership."
    },
    {
        id: 17,
        category: "AWS",
        difficulty: "Senior",
        question: "Your S3 bucket was accidentally made public and contains PII. What's your incident response plan?",
        answer: "1) Immediately block public access (bucket policy + block public access setting), 2) Audit CloudTrail logs for access, 3) Enable MFA Delete, 4) Rotate any leaked credentials, 5) Notify security/compliance team, 6) Implement preventive controls (S3 Block Public Access org-wide, AWS Config rules)",
        explanation: "Speed is critical. Block access first, investigate second. CloudTrail shows who accessed what. Prevention: use S3 Block Public Access at org level, AWS Config to detect violations, SCPs to prevent policy changes."
    },
    {
        id: 18,
        category: "AWS",
        difficulty: "Mid",
        question: "When should you use DynamoDB vs RDS?",
        answer: "DynamoDB: Need millisecond latency at any scale, simple key-value access, serverless, unpredictable traffic. RDS: Complex queries, joins, transactions, existing relational schema.",
        explanation: "DynamoDB scales automatically, no servers, single-digit-ms latency. RDS is traditional SQL. Choose based on access patterns: simple key lookups = DynamoDB, complex analytics = RDS."
    },
    {
        id: 19,
        category: "AWS",
        difficulty: "Mid",
        question: "How do you implement least privilege for IAM?",
        answer: "1) Start with no permissions, 2) Grant only what's needed for the job, 3) Use managed policies when possible, 4) Review permissions regularly (Access Advisor), 5) Use IAM roles instead of users for applications, 6) Enable MFA for privileged accounts",
        explanation: "Least privilege = minimal permissions to do the job. Access Advisor shows unused permissions. Roles are better than users (temporary credentials). MFA adds a second factor."
    },
    {
        id: 20,
        category: "AWS",
        difficulty: "Senior",
        question: "Explain blue-green deployment on AWS. What are the trade-offs?",
        answer: "Run two identical environments (blue=current, green=new). Deploy to green, test, switch traffic (Route 53/ALB), keep blue as rollback. Pros: instant rollback, full testing. Cons: doubles infrastructure cost during deployment, complex data migration.",
        explanation: "Blue-green minimizes downtime and risk. Traffic switches atomically. Rollback is instant (just switch back). Cost doubles temporarily. Database migrations are the hard part (schema compatibility required)."
    },

    // Kubernetes Questions (20)
    {
        id: 21,
        category: "Kubernetes",
        difficulty: "Junior",
        question: "What is a Pod in Kubernetes?",
        answer: "The smallest deployable unit - a group of one or more containers that share network and storage",
        explanation: "Pods are ephemeral. Usually 1 container per pod, but can have sidecars (logging, proxy). Containers in a pod share localhost networking and can share volumes."
    },
    {
        id: 22,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "Your pod keeps crashing with CrashLoopBackOff. How do you debug it?",
        answer: "1) kubectl logs <pod>, 2) kubectl describe pod <pod> (check events), 3) Check resource limits, 4) kubectl logs <pod> --previous (logs from crashed container), 5) Verify image, startup command, environment variables",
        explanation: "CrashLoopBackOff = container exits immediately. Logs show why. Describe shows events (image pull failures, resource issues). Common causes: wrong command, missing env vars, resource limits too low."
    },
    {
        id: 23,
        category: "Kubernetes",
        difficulty: "Senior",
        question: "How does Kubernetes scheduling work? What factors influence pod placement?",
        answer: "Scheduler filters nodes (resources, taints/tolerations, affinity), then scores remaining nodes. Factors: resource requests, node affinity/anti-affinity, taints/tolerations, topology spread constraints.",
        explanation: "Scheduler finds nodes that CAN run the pod (filtering), then picks the best one (scoring). Resource requests reserve capacity. Affinity attracts pods to nodes. Taints repel pods unless they tolerate."
    },
    {
        id: 24,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "What's the difference between a Deployment and a StatefulSet?",
        answer: "Deployment: stateless apps, pods are interchangeable, random names. StatefulSet: stateful apps, stable identities, ordered deployment/scaling, persistent storage per pod.",
        explanation: "Deployment for web servers, APIs (any instance can handle any request). StatefulSet for databases, Kafka, ZooKeeper (each pod has unique identity and storage)."
    },
    {
        id: 25,
        category: "Kubernetes",
        difficulty: "Junior",
        question: "What is a Service in Kubernetes?",
        answer: "A stable network endpoint that load balances traffic to a set of pods",
        explanation: "Pods have ephemeral IPs. Services provide a stable DNS name and IP. Types: ClusterIP (internal), NodePort (external on node port), LoadBalancer (cloud LB), ExternalName (CNAME)."
    },
    {
        id: 26,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "How do Kubernetes Ingress controllers work?",
        answer: "Ingress defines HTTP routing rules. Ingress Controller (nginx, traefik) watches Ingress resources and configures load balancer accordingly. Provides L7 routing, SSL termination, host/path-based routing.",
        explanation: "Ingress is the config (YAML). Controller is the implementation (pod running nginx/traefik). Together they provide smart HTTP routing without needing multiple LoadBalancers."
    },
    {
        id: 27,
        category: "Kubernetes",
        difficulty: "Senior",
        question: "Design a highly available Kubernetes cluster. What components need redundancy?",
        answer: "3+ control plane nodes (etcd, API server, scheduler, controller manager), multiple worker nodes across availability zones, LoadBalancer for API server, etcd with odd number of members (3 or 5), backup strategy for etcd.",
        explanation: "HA = no single point of failure. Control plane needs 3+ nodes (etcd quorum). Workers across AZs survive zone failure. API server behind LB. etcd is the critical datastore - back it up!"
    },
    {
        id: 28,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "What are Kubernetes resource requests vs limits?",
        answer: "Requests: guaranteed resources (used for scheduling). Limits: maximum resources (throttled if exceeded). CPU is throttled, memory is OOMKilled.",
        explanation: "Request = 'I need at least this'. Limit = 'Never give me more than this'. Set requests based on normal usage, limits based on peak. No request = pods can land on overcommitted nodes."
    },
    {
        id: 29,
        category: "Kubernetes",
        difficulty: "Junior",
        question: "What is kubectl?",
        answer: "Command-line tool for interacting with Kubernetes API server - deploy, inspect, manage cluster resources",
        explanation: "kubectl is your primary interface to Kubernetes. Common commands: get, describe, logs, apply, delete, exec. It talks to the API server using kubeconfig credentials."
    },
    {
        id: 30,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "How do you perform a zero-downtime deployment in Kubernetes?",
        answer: "Use RollingUpdate strategy (default for Deployments). Configure maxUnavailable and maxSurge. Ensure readiness probes are configured correctly. Monitor rollout status.",
        explanation: "RollingUpdate replaces pods gradually. maxUnavailable = how many can be down during update. maxSurge = how many extra pods can be created. Readiness probes ensure new pods are healthy before old ones terminate."
    },
    {
        id: 31,
        category: "Kubernetes",
        difficulty: "Senior",
        question: "Explain how Kubernetes secrets work. Are they secure?",
        answer: "Secrets store sensitive data (base64 encoded, NOT encrypted by default). Mounted as volumes or env vars. Enable encryption at rest in etcd. Use external secret managers (Vault, AWS Secrets Manager) for production.",
        explanation: "Secrets are better than hardcoding, but base64 != encryption. Anyone with etcd access can decode. Enable encryption at rest (etcd). For real security, use Vault or cloud secret managers with CSI drivers."
    },
    {
        id: 32,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "What is a DaemonSet and when would you use it?",
        answer: "Ensures a copy of a pod runs on every node (or subset). Use cases: log collectors, monitoring agents, network plugins, storage daemons.",
        explanation: "DaemonSet guarantees one pod per node. Perfect for cluster-wide services. Example: Fluentd for logs, Datadog agent for metrics, Calico for networking."
    },
    {
        id: 33,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "How does Horizontal Pod Autoscaling work?",
        answer: "HPA watches metrics (CPU, memory, custom), compares to target, scales replicas up/down. Metrics from Metrics Server or custom sources (Prometheus). Includes cooldown to prevent flapping.",
        explanation: "HPA adjusts replica count based on observed metrics. Needs Metrics Server installed. Set target (e.g., 80% CPU), HPA maintains it. Check scaling with: kubectl get hpa"
    },
    {
        id: 34,
        category: "Kubernetes",
        difficulty: "Senior",
        question: "Your cluster is running out of resources. How do you troubleshoot and resolve?",
        answer: "1) kubectl top nodes/pods (find hogs), 2) Check resource requests vs actual usage, 3) Identify pods without limits, 4) Look for memory leaks, 5) Scale up cluster or optimize workloads (right-size requests, add limits, fix leaks)",
        explanation: "Top shows actual usage. Compare to requests (over-requesting wastes capacity). Pods without limits can starve others. Memory leaks need code fixes. Solution: optimize or add nodes."
    },
    {
        id: 35,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "What's the purpose of Kubernetes namespaces?",
        answer: "Logical isolation within a cluster - separate teams, projects, or environments. Enables resource quotas, RBAC boundaries, network policies per namespace.",
        explanation: "Namespaces aren't hard isolation (can still communicate unless NetworkPolicies block). Use for: dev/staging/prod separation, team boundaries, cost tracking. Default namespaces: default, kube-system, kube-public."
    },
    {
        id: 36,
        category: "Kubernetes",
        difficulty: "Junior",
        question: "What is a ConfigMap?",
        answer: "Store non-sensitive configuration data (env vars, config files) separately from container images",
        explanation: "ConfigMaps decouple config from code. Mount as volume or inject as env vars. Enables same image across environments (dev/staging/prod) with different configs."
    },
    {
        id: 37,
        category: "Kubernetes",
        difficulty: "Senior",
        question: "How would you implement network segmentation in Kubernetes?",
        answer: "Use NetworkPolicies to define ingress/egress rules per pod/namespace. Default deny all, explicitly allow required traffic. Requires CNI plugin that supports NetworkPolicy (Calico, Cilium).",
        explanation: "NetworkPolicies are firewall rules for pods. Label-based selection. Default is allow-all (insecure). Best practice: default deny, whitelist traffic. Not all CNIs support this - verify yours does."
    },
    {
        id: 38,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "What are liveness and readiness probes? How do they differ?",
        answer: "Liveness: is the app alive? If fails, restart pod. Readiness: is the app ready for traffic? If fails, remove from Service endpoints. Both prevent sending traffic to broken pods.",
        explanation: "Liveness detects deadlocks (restart to recover). Readiness detects slow startup or temporary unavailability (don't send traffic, but don't restart). Use both for resilient apps."
    },
    {
        id: 39,
        category: "Kubernetes",
        difficulty: "Senior",
        question: "Explain the Kubernetes Operator pattern. When would you build one?",
        answer: "Operator = custom controller that extends Kubernetes API with CRDs (Custom Resource Definitions). Encodes operational knowledge (backup, upgrade, scaling) for complex applications. Build when managing stateful apps (databases, message queues) that need lifecycle automation.",
        explanation: "Operators turn operational runbooks into code. Example: backup Postgres daily, handle failover. CRD defines 'PostgresCluster' resource, Operator watches and manages it. Use for: databases, distributed systems, apps with complex lifecycle."
    },
    {
        id: 40,
        category: "Kubernetes",
        difficulty: "Mid",
        question: "How do you update a Kubernetes cluster safely?",
        answer: "1) Backup etcd, 2) Update control plane first (one node at a time), 3) Verify API server health, 4) Drain and update worker nodes (cordon, drain, update, uncordon), 5) Test workloads after each node, 6) Keep cluster and kubectl versions aligned",
        explanation: "Control plane first (API server, etcd, scheduler). Then workers. Drain moves pods off node before update. Cordon prevents new pods. Test after each node. Always backup etcd first!"
    },

    // Terraform Questions (15)
    {
        id: 41,
        category: "Terraform",
        difficulty: "Junior",
        question: "What is Terraform and what problem does it solve?",
        answer: "Infrastructure as Code tool - define cloud resources in HCL, version control infrastructure, deploy consistently, track changes",
        explanation: "Terraform lets you manage infrastructure like code: version it, review it, test it, deploy it. Works across cloud providers (AWS, Azure, GCP). Alternative to ClickOps."
    },
    {
        id: 42,
        category: "Terraform",
        difficulty: "Mid",
        question: "Explain the Terraform workflow: init, plan, apply.",
        answer: "Init: download providers and modules. Plan: preview changes (dry-run). Apply: execute changes, update state.",
        explanation: "terraform init sets up working directory. terraform plan shows what will change (add/modify/destroy). terraform apply makes it happen. Always review plan before apply!"
    },
    {
        id: 43,
        category: "Terraform",
        difficulty: "Senior",
        question: "Your Terraform state is out of sync with reality. How do you fix it?",
        answer: "1) terraform refresh (update state from reality), 2) terraform import (add existing resources), 3) terraform state rm (remove orphaned resources), 4) Manual state surgery as last resort (backup first!). Prevention: use remote state locking.",
        explanation: "State drift happens (manual changes, failed applies). Refresh updates state to match reality. Import adds forgotten resources. State commands are powerful but dangerous - backup state first!"
    },
    {
        id: 44,
        category: "Terraform",
        difficulty: "Mid",
        question: "What is Terraform state and why is it important?",
        answer: "State maps config to real resources - tracks what Terraform manages, enables plan/apply, stores metadata. Critical file - loss means Terraform can't manage resources.",
        explanation: "State is Terraform's memory. Without it, Terraform doesn't know what it created. Store remotely (S3 + DynamoDB), enable versioning, use locking to prevent conflicts."
    },
    {
        id: 45,
        category: "Terraform",
        difficulty: "Mid",
        question: "How do you handle secrets in Terraform?",
        answer: "Don't hardcode! Use: 1) AWS Secrets Manager/Parameter Store with data sources, 2) Vault provider, 3) Environment variables, 4) Encrypted .tfvars (git-crypt). Mark outputs as sensitive.",
        explanation: "Never commit secrets to Git. Fetch from secret managers at runtime. Use sensitive = true for outputs (hides in logs). Environment variables work but aren't ideal for teams."
    },
    {
        id: 46,
        category: "Terraform",
        difficulty: "Junior",
        question: "What is a Terraform module?",
        answer: "Reusable container of Terraform config - like a function. Accepts inputs (variables), creates resources, returns outputs. Enables DRY principle.",
        explanation: "Modules encapsulate infrastructure patterns (e.g., 'VPC module', 'RDS module'). Reuse across projects, enforce standards, simplify complex configs. Can be local or from Terraform Registry."
    },
    {
        id: 47,
        category: "Terraform",
        difficulty: "Senior",
        question: "Design a Terraform project structure for multi-environment (dev/staging/prod) infrastructure.",
        answer: "Use workspaces or separate directories per environment. Shared modules in /modules. Backend config per environment. Variables in .tfvars per env. CI/CD pipelines validate/plan/apply per environment with approval gates for prod.",
        explanation: "Option 1: Workspaces (same code, different state). Option 2: Directories (environments/, modules/). I prefer directories - explicit, easier to understand. Use modules to stay DRY. Remote state per env."
    },
    {
        id: 48,
        category: "Terraform",
        difficulty: "Mid",
        question: "What are Terraform providers and how do they work?",
        answer: "Plugins that interact with APIs (AWS, Azure, K8s, etc.). Define available resources and data sources. Configured in terraform{} block, downloaded during terraform init.",
        explanation: "Providers are the glue between Terraform and APIs. Each provider (aws, kubernetes, datadog) has its own resources. Version them to prevent breaking changes."
    },
    {
        id: 49,
        category: "Terraform",
        difficulty: "Mid",
        question: "How do you prevent Terraform from destroying critical resources?",
        answer: "1) lifecycle { prevent_destroy = true }, 2) Use terraform plan review process, 3) Protect with IAM policies, 4) Enable deletion protection on resources (e.g., RDS), 5) Use separate state for critical resources",
        explanation: "prevent_destroy stops accidental terraform destroy. But can be overridden with -force. Real protection: IAM + deletion protection + careful review. Critical infra (prod DB) should be in separate state."
    },
    {
        id: 50,
        category: "Terraform",
        difficulty: "Senior",
        question: "Explain the difference between count and for_each in Terraform.",
        answer: "count: creates N identical resources (indexed 0, 1, 2...). for_each: creates resources from map/set (keyed by map key). for_each is better - changes don't cause resource recreation.",
        explanation: "count seems simpler but is fragile (removing middle item recreates all after it). for_each is stable - items are identified by key, not position. Use for_each for lists of resources."
    },
    {
        id: 51,
        category: "Terraform",
        difficulty: "Mid",
        question: "What is terraform import and when do you use it?",
        answer: "Brings existing resources under Terraform management. Writes resource to state. You still need to write the config manually. Use when adopting Terraform for existing infrastructure.",
        explanation: "Import doesn't generate config - you write that. It just links state to existing resource. Useful for: migrating to Terraform, recovering from manual changes, adopting legacy infra."
    },
    {
        id: 52,
        category: "Terraform",
        difficulty: "Junior",
        question: "What is the purpose of terraform.tfvars?",
        answer: "File for variable values - keeps configs DRY and secrets out of main code. Auto-loaded by Terraform.",
        explanation: "Variables define inputs (var \"region\" {}). .tfvars provides values (region = \"us-west-2\"). Different .tfvars per environment (dev.tfvars, prod.tfvars). Don't commit secrets in .tfvars!"
    },
    {
        id: 53,
        category: "Terraform",
        difficulty: "Senior",
        question: "How do you handle Terraform state in a team environment?",
        answer: "Remote state (S3 + DynamoDB for locking), enable versioning, use separate state per environment/component, implement CI/CD with state locking, define RBAC for state access, backup regularly.",
        explanation: "Local state doesn't work for teams (conflicts, no locking). S3 + DynamoDB is AWS standard. Locking prevents simultaneous applies. Versioning allows rollback. Separate states reduce blast radius."
    },
    {
        id: 54,
        category: "Terraform",
        difficulty: "Mid",
        question: "What are data sources in Terraform?",
        answer: "Read-only queries to fetch info about existing resources (e.g., AMI IDs, VPC details, availability zones). Don't create resources, just reference them.",
        explanation: "Data sources query APIs. Example: fetch latest Ubuntu AMI, lookup VPC by tag, get current AWS account ID. Use to reference resources not managed by this Terraform config."
    },
    {
        id: 55,
        category: "Terraform",
        difficulty: "Senior",
        question: "Your terraform apply failed mid-execution. What's the state of your infrastructure?",
        answer: "Partial apply - some resources created, some failed, state reflects successful resources. Run terraform plan to see drift. Fix the error, run apply again (Terraform is idempotent). Check state with terraform show.",
        explanation: "Failed apply doesn't rollback - it's not transactional. State contains what succeeded. Terraform will retry failed resources on next apply. This is why plan review is critical!"
    },

    // Docker Questions (15)
    {
        id: 56,
        category: "Docker",
        difficulty: "Junior",
        question: "What is a Docker container?",
        answer: "A lightweight, standalone executable package including code, runtime, libraries, and dependencies. Runs consistently across environments.",
        explanation: "Containers share the host kernel (unlike VMs). They're isolated processes. Benefits: fast startup, portable, consistent from dev to prod."
    },
    {
        id: 57,
        category: "Docker",
        difficulty: "Mid",
        question: "Explain the difference between COPY and ADD in a Dockerfile.",
        answer: "COPY: simple file copy. ADD: same as COPY but also handles tar extraction and remote URLs. Prefer COPY (explicit, predictable).",
        explanation: "ADD has 'magic' behavior (auto-extracts .tar, downloads URLs). COPY is straightforward. Best practice: use COPY unless you specifically need ADD's features."
    },
    {
        id: 58,
        category: "Docker",
        difficulty: "Senior",
        question: "How do you optimize a Docker image for size and build time?",
        answer: "1) Multi-stage builds (build in one stage, copy artifacts to minimal base), 2) Use .dockerignore, 3) Combine RUN commands, 4) Order layers (least to most frequently changing), 5) Use specific base images (alpine), 6) Clean up in same layer (rm -rf), 7) Leverage build cache",
        explanation: "Each Dockerfile instruction is a layer. Layers cache. Put changing stuff last. Multi-stage builds are key - build with all tools, run with minimal image. Alpine is tiny. Don't include dev dependencies in final image."
    },
    {
        id: 59,
        category: "Docker",
        difficulty: "Mid",
        question: "What's the difference between CMD and ENTRYPOINT?",
        answer: "ENTRYPOINT: main command (always runs). CMD: default arguments to ENTRYPOINT (can be overridden). Together: ENTRYPOINT defines the executable, CMD provides default args.",
        explanation: "ENTRYPOINT = 'run this command'. CMD = 'with these args'. User can override CMD at runtime (docker run <image> <new_args>). Combine for flexibility: ENTRYPOINT [\"/app\"], CMD [\"--help\"]."
    },
    {
        id: 60,
        category: "Docker",
        difficulty: "Junior",
        question: "What is Docker Compose?",
        answer: "Tool for defining and running multi-container applications using a YAML file (docker-compose.yml)",
        explanation: "Compose orchestrates multiple containers (app + database + cache). Define services, networks, volumes in one file. Commands: docker-compose up/down/ps. Great for local development."
    },
    {
        id: 61,
        category: "Docker",
        difficulty: "Mid",
        question: "Your Docker container has no network connectivity. How do you troubleshoot?",
        answer: "1) Check network mode (docker inspect <container>), 2) Verify network exists (docker network ls), 3) Test connectivity (docker exec <container> ping google.com), 4) Check firewall rules, 5) Inspect DNS (cat /etc/resolv.conf), 6) Check host network config",
        explanation: "Common issues: wrong network mode, DNS misconfiguration, firewall blocking. Default 'bridge' network works for most cases. Use docker network inspect to see which containers are on which network."
    },
    {
        id: 62,
        category: "Docker",
        difficulty: "Senior",
        question: "How do Docker volumes differ from bind mounts? When would you use each?",
        answer: "Volumes: managed by Docker, stored in /var/lib/docker/volumes, best for production, can be backed up/migrated. Bind mounts: direct host path, good for dev (code hot-reload), depends on host filesystem.",
        explanation: "Volumes are Docker-native (docker volume ls). Bind mounts link to host paths. Use volumes for: databases, app state. Use bind mounts for: local development (mount source code for instant reload)."
    },
    {
        id: 63,
        category: "Docker",
        difficulty: "Mid",
        question: "What is a Dockerfile and what's in a typical one?",
        answer: "Blueprint for building Docker images. Typical structure: FROM (base image), WORKDIR, COPY/ADD (files), RUN (install deps), EXPOSE (ports), CMD/ENTRYPOINT (startup command).",
        explanation: "Dockerfile = recipe for an image. Each instruction creates a layer. Order matters (caching). Keep frequently changing layers at the end. Example: COPY requirements.txt before COPY . (cache pip install)."
    },
    {
        id: 64,
        category: "Docker",
        difficulty: "Mid",
        question: "How do you securely manage secrets in Docker?",
        answer: "1) Use Docker secrets (Swarm mode), 2) Mount secrets from orchestrator (K8s secrets), 3) Environment variables from external source (Vault), 4) Never bake secrets into images, 5) Use .dockerignore for sensitive files",
        explanation: "Don't hardcode secrets in Dockerfile. Don't use ENV for secrets (visible in docker inspect). Use runtime injection: Docker Swarm secrets, K8s secrets, or env vars from secret manager. Scan images for leaked secrets (git-secrets, trufflehog)."
    },
    {
        id: 65,
        category: "Docker",
        difficulty: "Junior",
        question: "What's the purpose of .dockerignore?",
        answer: "Excludes files from build context (like .gitignore). Prevents large/sensitive files from being sent to Docker daemon, speeds up builds.",
        explanation: "Build context = everything in directory sent to Docker daemon. Exclude: node_modules, .git, logs, secrets. Smaller context = faster builds. Security: don't include .env, credentials."
    },
    {
        id: 66,
        category: "Docker",
        difficulty: "Senior",
        question: "Explain Docker networking modes and when to use each.",
        answer: "Bridge (default): isolated network, containers communicate via IP. Host: share host network stack (performance, no isolation). None: no networking (max isolation). Custom bridge: user-defined networks with DNS.",
        explanation: "Bridge for most apps (isolation + inter-container communication). Host for performance-critical apps (removes network overhead). None for security (airgapped). Custom bridge adds DNS - containers talk by name, not IP."
    },
    {
        id: 67,
        category: "Docker",
        difficulty: "Mid",
        question: "What is the difference between docker run and docker exec?",
        answer: "docker run: creates and starts a new container from an image. docker exec: runs a command in an existing running container.",
        explanation: "run = create + start. exec = run command in existing container (e.g., docker exec -it <container> /bin/bash for debugging). exec requires container to be running already."
    },
    {
        id: 68,
        category: "Docker",
        difficulty: "Senior",
        question: "How would you debug a container that immediately exits?",
        answer: "1) docker logs <container>, 2) docker run -it <image> /bin/sh (override CMD), 3) docker inspect <container> (check exit code), 4) Run in foreground with -it, 5) Check for missing dependencies or environment variables",
        explanation: "Exited containers leave logs. docker logs shows output. Exit code (docker inspect) hints at issue (137 = OOMKilled, 1 = error). Override entrypoint to get shell: docker run -it --entrypoint /bin/sh <image>"
    },
    {
        id: 69,
        category: "Docker",
        difficulty: "Mid",
        question: "What are Docker layer caching and how do you leverage it effectively?",
        answer: "Each Dockerfile instruction creates a layer. Docker caches unchanged layers. Order instructions from least to most frequently changing. COPY dependencies file before code to cache dependency install.",
        explanation: "Cache speeds up builds. If a layer changes, all subsequent layers rebuild. Example: COPY package.json + RUN npm install (cached) BEFORE COPY . (changes often). Invalidating cache early wastes time."
    },
    {
        id: 70,
        category: "Docker",
        difficulty: "Senior",
        question: "What is a multi-stage Docker build and why use it?",
        answer: "Multiple FROM statements in one Dockerfile. Build artifacts in one stage (with all build tools), copy to minimal final stage (without build tools). Results in much smaller production images.",
        explanation: "Stage 1: Build (golang:1.19, npm, etc.). Stage 2: Runtime (alpine, scratch). COPY --from=0 /app/binary /app/. Final image only has binary, not build tools. Smaller = faster deploys, less attack surface."
    },

    // Monitoring Questions (12)
    {
        id: 71,
        category: "Monitoring",
        difficulty: "Junior",
        question: "What are the four golden signals of monitoring?",
        answer: "Latency (response time), Traffic (requests/sec), Errors (failure rate), Saturation (resource usage)",
        explanation: "Google SRE book golden signals. Latency: how fast. Traffic: how many requests. Errors: how many failures. Saturation: how full (CPU, memory, disk). Together they give a complete health picture."
    },
    {
        id: 72,
        category: "Monitoring",
        difficulty: "Mid",
        question: "Explain the difference between metrics, logs, and traces.",
        answer: "Metrics: numerical time-series (CPU %, request count). Logs: text events (errors, audit). Traces: request flow through distributed system (spans). All three = observability.",
        explanation: "Metrics for trends and alerts. Logs for debugging specific events. Traces for distributed troubleshooting (which service is slow?). Combine all three for full observability. Tools: Prometheus (metrics), ELK (logs), Jaeger (traces)."
    },
    {
        id: 73,
        category: "Monitoring",
        difficulty: "Senior",
        question: "Design an alerting strategy that minimizes alert fatigue.",
        answer: "1) Alert on symptoms, not causes (users can't login, not CPU high), 2) Actionable alerts only (if you can't fix it now, don't page), 3) Severity levels (critical = page, warning = ticket), 4) Aggregate similar alerts, 5) Use SLOs, 6) Regular alert review (prune noisy ones)",
        explanation: "Alert fatigue kills on-call morale. Only page for user-impacting issues. Group alerts (don't page for each pod restart). Use runbooks (what to do). SLOs define 'is this actually a problem?' Review and delete noisy alerts quarterly."
    },
    {
        id: 74,
        category: "Monitoring",
        difficulty: "Mid",
        question: "What is Prometheus and how does it work?",
        answer: "Time-series metrics database. Scrapes /metrics endpoints via HTTP pull model. Stores metrics with labels. PromQL for querying. Alertmanager for alerts. De facto standard for K8s monitoring.",
        explanation: "Prometheus pulls metrics (scrape model). Targets expose /metrics (text format). Store as time-series. Query with PromQL (CPU > 80%). Integrates with Grafana for dashboards. Built for dynamic environments (K8s service discovery)."
    },
    {
        id: 75,
        category: "Monitoring",
        difficulty: "Mid",
        question: "How would you monitor a microservices architecture?",
        answer: "1) Distributed tracing (Jaeger, Zipkin), 2) Centralized logging (ELK, Loki), 3) Service mesh metrics (Istio, Linkerd), 4) APM tools (Datadog, New Relic), 5) SLOs per service, 6) Correlation IDs across requests",
        explanation: "Microservices are complex - requests cross many services. Tracing shows request flow. Centralized logs aggregate from all services. Service mesh adds network-level metrics. SLOs define health per service. Correlation IDs link logs/traces for one request."
    },
    {
        id: 76,
        category: "Monitoring",
        difficulty: "Junior",
        question: "What is an SLO (Service Level Objective)?",
        answer: "Target reliability level for a service (e.g., 99.9% uptime, p95 latency < 200ms). More lenient than SLA (legal contract).",
        explanation: "SLO defines 'how reliable should we be?' Based on user needs, not 100%. Gives error budget (if SLO is 99.9%, we can have 0.1% downtime). SLA is external promise (contracts). SLO is internal goal."
    },
    {
        id: 77,
        category: "Monitoring",
        difficulty: "Senior",
        question: "What's the difference between white-box and black-box monitoring?",
        answer: "White-box: internal metrics (CPU, memory, logs, traces) - knows system internals. Black-box: external testing (synthetic checks, ping, API calls) - user perspective. Use both.",
        explanation: "White-box: instrument your code, scrape metrics. Good for: understanding why. Black-box: test from outside (like a user would). Good for: detecting outages, SLO validation. Combine: black-box alerts, white-box debugs."
    },
    {
        id: 78,
        category: "Monitoring",
        difficulty: "Mid",
        question: "How do you set meaningful alert thresholds?",
        answer: "1) Baseline normal behavior (percentiles, not averages), 2) Alert on anomalies vs static thresholds when possible, 3) Use SLOs to define thresholds, 4) Test alerts (inject failures), 5) Iterate based on false positives",
        explanation: "Don't guess thresholds. Measure reality first (p95, p99). Static thresholds break (traffic grows). Anomaly detection adapts. SLO-based alerts mean 'we're burning error budget fast'. Test alerts or you'll page at 3am for non-issues."
    },
    {
        id: 79,
        category: "Monitoring",
        difficulty: "Mid",
        question: "What is the ELK stack?",
        answer: "Elasticsearch (storage + search), Logstash (ingestion + transformation), Kibana (visualization). Used for centralized logging and log analysis.",
        explanation: "Logs from all servers/containers → Logstash (parse, filter, transform) → Elasticsearch (store, index) → Kibana (search, visualize, dashboard). Alternative: Loki + Grafana (cheaper, simpler)."
    },
    {
        id: 80,
        category: "Monitoring",
        difficulty: "Senior",
        question: "How would you implement synthetic monitoring for a critical API?",
        answer: "1) External probes (different regions/ISPs), 2) Test critical user flows (login, checkout), 3) Run every 1-5 minutes, 4) Assert on: response time, status code, response content, 5) Alert if multiple consecutive failures, 6) Tools: Pingdom, Datadog Synthetics, custom scripts + cron",
        explanation: "Synthetic = fake user traffic. Tests from user perspective. Multi-region probes detect localized issues. Test real workflows, not just ping. Consecutive failures reduce false positives (network blips). Combine with RUM (Real User Monitoring)."
    },
    {
        id: 81,
        category: "Monitoring",
        difficulty: "Mid",
        question: "What is an error budget and how is it used?",
        answer: "Allowed downtime based on SLO (e.g., 99.9% SLO = 43 min/month error budget). Track spending. If budget exhausted, freeze features, focus on reliability. If budget remains, invest in features.",
        explanation: "Error budget quantifies reliability vs velocity tradeoff. High reliability = slow releases. Spend budget on features. Overspend = reliability crisis. It aligns eng with business (reliability isn't free)."
    },
    {
        id: 82,
        category: "Monitoring",
        difficulty: "Mid",
        question: "How do you monitor Kubernetes cluster health?",
        answer: "1) Node metrics (CPU, memory, disk), 2) Pod/container metrics, 3) kube-state-metrics (pod states, deployments), 4) Control plane metrics (API server, etcd), 5) Application metrics, 6) Tools: Prometheus + Grafana, cAdvisor, kube-state-metrics",
        explanation: "Multiple layers: nodes, K8s control plane, pods, apps. kube-state-metrics exposes K8s object state (pods pending, deployments ready). cAdvisor for container metrics. Prometheus scrapes all. Grafana visualizes. Monitor etcd health (critical!)."
    },

    // Networking Questions (10)
    {
        id: 83,
        category: "Networking",
        difficulty: "Junior",
        question: "What is DNS and how does it work?",
        answer: "Domain Name System - translates domain names (google.com) to IP addresses (172.217.164.78). Hierarchy: root → TLD (.com) → authoritative nameserver.",
        explanation: "DNS is the internet's phonebook. Your computer asks recursive resolver, which queries root, TLD, and authoritative nameservers. Results cached for TTL. A records = IPv4, AAAA = IPv6, CNAME = alias."
    },
    {
        id: 84,
        category: "Networking",
        difficulty: "Mid",
        question: "Explain the difference between TCP and UDP.",
        answer: "TCP: connection-oriented, reliable (retransmits lost packets), ordered delivery, flow control. UDP: connectionless, fast, no guarantees, used for streaming/gaming where speed > reliability.",
        explanation: "TCP = phone call (establish connection, guaranteed delivery). UDP = shouting across a room (no confirmation). TCP for: HTTP, SSH, databases. UDP for: DNS, video streaming, VoIP. TCP overhead = slower but reliable."
    },
    {
        id: 85,
        category: "Networking",
        difficulty: "Senior",
        question: "Your application's latency increased after adding a load balancer. How do you troubleshoot?",
        answer: "1) Check LB health checks (marking backends unhealthy?), 2) Review LB logs (timeouts, connection errors), 3) Measure LB processing time vs backend time, 4) Check LB resource limits (connections, CPU), 5) Verify SSL termination overhead, 6) Test direct to backend (bypass LB)",
        explanation: "LBs add latency (small, but measurable). Common issues: health checks too aggressive (flapping), connection limits hit, SSL handshake overhead. Logs show backend response times. Compare direct-to-backend vs through-LB latency."
    },
    {
        id: 86,
        category: "Networking",
        difficulty: "Mid",
        question: "What is a subnet and why would you use multiple subnets?",
        answer: "Subnet = subdivision of IP network (CIDR). Use multiple for: security (isolate tiers), availability zones, routing control, resource organization.",
        explanation: "Example: 10.0.0.0/16 VPC divided into 10.0.1.0/24 (public subnet), 10.0.2.0/24 (private app), 10.0.3.0/24 (private DB). Public subnet has internet gateway. Private subnets use NAT. Spread across AZs for HA."
    },
    {
        id: 87,
        category: "Networking",
        difficulty: "Mid",
        question: "How does a CDN improve performance?",
        answer: "Content Delivery Network caches static assets (images, CSS, JS) at edge locations near users. Reduces latency (shorter distance), offloads origin server, handles DDoS better.",
        explanation: "User requests image → CDN edge has cached copy (served instantly from nearby location) OR fetches from origin (caches for next request). Examples: CloudFront, Cloudflare, Fastly. Best for: static assets, public content, global audience."
    },
    {
        id: 88,
        category: "Networking",
        difficulty: "Junior",
        question: "What is HTTPS and why is it important?",
        answer: "HTTP over TLS/SSL - encrypts traffic between browser and server. Protects against eavesdropping, tampering, impersonation. Required for modern web (SEO, browser trust).",
        explanation: "HTTPS encrypts data in transit (credentials, personal info). TLS certificate proves server identity. Browsers mark HTTP as 'Not Secure'. Let's Encrypt provides free certificates. Always use HTTPS for production."
    },
    {
        id: 89,
        category: "Networking",
        difficulty: "Senior",
        question: "Design a network architecture for a three-tier web application (web, app, database) with high availability.",
        answer: "Multi-AZ VPC with 6 subnets: 2 public (web, different AZs), 2 private app (app tier, different AZs), 2 private data (DB, different AZs). Internet Gateway for public, NAT Gateway per AZ for private. ALB in public subnets, Auto Scaling Groups for web/app tiers, Multi-AZ RDS in data subnets. Security Groups per tier.",
        explanation: "Public subnets: ALB, bastion. Private app: app servers (via NAT for updates). Private data: DBs (no internet). Multi-AZ = survive AZ failure. Security Groups: web allows 80/443, app allows traffic from web, DB allows traffic from app. NAT Gateway per AZ for HA."
    },
    {
        id: 90,
        category: "Networking",
        difficulty: "Mid",
        question: "What is a NAT Gateway and when do you need it?",
        answer: "Network Address Translation - allows private subnet resources to access internet (outbound only, no inbound). Use for: software updates, API calls, while keeping resources private.",
        explanation: "Private subnet instances have no public IPs. NAT Gateway in public subnet translates private IPs to its public IP. Internet sees NAT's IP, not instance IP. One-way: instances can initiate outbound, but inbound blocked. AWS managed service (HA, scaling)."
    },
    {
        id: 91,
        category: "Networking",
        difficulty: "Mid",
        question: "How do you troubleshoot intermittent network connectivity issues?",
        answer: "1) Check DNS (nslookup, dig), 2) Test routing (traceroute, mtr), 3) Packet loss (ping -c 100), 4) Firewall/Security Group logs, 5) Network congestion (bandwidth saturation), 6) SSL/TLS issues (openssl s_client), 7) Check for rate limiting",
        explanation: "Intermittent = hardest to debug. Collect data: ping shows packet loss, traceroute shows routing changes, mtr combines both. DNS can flap. Firewalls may have stateful connection limits. SSL cert expiry. Rate limiting by upstream."
    },
    {
        id: 92,
        category: "Networking",
        difficulty: "Senior",
        question: "Explain the difference between Layer 4 and Layer 7 load balancing.",
        answer: "Layer 4 (Transport): routes based on IP + port, doesn't inspect payload, fast, stateless. Layer 7 (Application): routes based on HTTP headers/path/cookies, content-aware, slower, enables advanced routing.",
        explanation: "L4 (NLB): sees TCP/UDP packets, routes by IP:port. Ultra-fast, handles millions of req/s. L7 (ALB): sees HTTP, routes by URL path (/api → backend-api, /images → static-server). SSL termination, WebSocket, host-based routing. Use L4 for performance, L7 for flexibility."
    },

    // Security Questions (10)
    {
        id: 93,
        category: "Security",
        difficulty: "Junior",
        question: "What is the principle of least privilege?",
        answer: "Grant only the minimum permissions needed to perform a job. Reduces blast radius if credentials compromised.",
        explanation: "Don't give admin access if read-only suffices. Don't give database-wide access if one table is enough. Review permissions regularly. Applies to: IAM users, K8s RBAC, database users, file permissions."
    },
    {
        id: 94,
        category: "Security",
        difficulty: "Mid",
        question: "How do you securely store secrets in a cloud environment?",
        answer: "Use dedicated secret managers (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault). Encrypt at rest, audit access, rotate regularly, inject at runtime (don't bake into images/code).",
        explanation: "Never hardcode secrets. Don't store in env vars in orchestrator (visible in logs). Use secret managers: centralized, encrypted, audited, rotated. Inject via: K8s secrets, ECS task IAM role, Vault agent. Scan repos for leaked secrets (git-secrets, trufflehog)."
    },
    {
        id: 95,
        category: "Security",
        difficulty: "Senior",
        question: "A developer committed AWS credentials to a public GitHub repo. What's your incident response?",
        answer: "1) Immediately revoke credentials (AWS IAM console), 2) Audit CloudTrail for unauthorized usage, 3) Check for crypto miners / unexpected resources, 4) Rotate all related credentials, 5) Force-push to remove from Git history (BFG Repo-Cleaner), 6) Notify security team, 7) Review bills for unexpected charges, 8) Implement preventive controls (git-secrets pre-commit hooks, AWS canary tokens)",
        explanation: "Speed is critical - credentials are scanned by bots within minutes. Revoke first, investigate second. CloudTrail shows what was accessed. Check for EC2 instances in weird regions (crypto mining). Can't just delete commit - rewrite history. Prevent: pre-commit hooks, AWS credential scanning, developer training."
    },
    {
        id: 96,
        category: "Security",
        difficulty: "Mid",
        question: "What is RBAC in Kubernetes and how does it work?",
        answer: "Role-Based Access Control - defines who (users/serviceaccounts) can do what (verbs) to which resources (pods, deployments). Role = permissions, RoleBinding = assigns role to subject.",
        explanation: "RBAC secures K8s API access. Role defines permissions (get pods, create deployments). RoleBinding assigns role to user/group/serviceaccount. Namespace-scoped: Role/RoleBinding. Cluster-scoped: ClusterRole/ClusterRoleBinding. Principle: start with zero access, grant incrementally."
    },
    {
        id: 97,
        category: "Security",
        difficulty: "Mid",
        question: "How do you harden a Linux server?",
        answer: "1) Disable root SSH login, 2) Use SSH keys (not passwords), 3) Configure firewall (iptables/ufw), 4) Keep packages updated, 5) Disable unused services, 6) Use fail2ban (brute force protection), 7) Enable SELinux/AppArmor, 8) Audit with Lynis/OpenSCAP",
        explanation: "Security layers: SSH hardening, firewall (only open needed ports), patching, minimal attack surface (disable unnecessary services), intrusion detection. Regular audits find misconfigurations. Automated tools: fail2ban bans IPs after failed logins, Lynis scans for issues."
    },
    {
        id: 98,
        category: "Security",
        difficulty: "Senior",
        question: "Design a zero-trust network architecture for a microservices application.",
        answer: "1) mTLS everywhere (service mesh like Istio), 2) No implicit trust (authenticate every request), 3) Network segmentation (NetworkPolicies, separate VPCs), 4) Least privilege RBAC, 5) Encrypt data in transit + at rest, 6) Runtime security (Falco), 7) Continuous verification (not perimeter-based)",
        explanation: "Zero-trust = never trust, always verify. Traditional: perimeter defense (firewall). Zero-trust: every service authenticates, even internally. Service mesh provides mTLS identity. NetworkPolicies segment pods. Vault for secrets. Falco detects runtime anomalies. Assume breach, limit blast radius."
    },
    {
        id: 99,
        category: "Security",
        difficulty: "Mid",
        question: "What is container image scanning and why is it important?",
        answer: "Automated scanning of container images for vulnerabilities (CVEs), secrets, malware. Detects outdated dependencies, exposed credentials, known exploits. Integrate into CI/CD (fail builds on critical CVEs).",
        explanation: "Images inherit vulnerabilities from base images and dependencies. Scanning tools: Trivy, Clair, Snyk. Scan at build time (block vulnerable images) and runtime (monitor running containers). Common findings: old base images, npm packages with CVEs, hardcoded secrets."
    },
    {
        id: 100,
        category: "Security",
        difficulty: "Junior",
        question: "What is MFA (Multi-Factor Authentication) and why use it?",
        answer: "Requires two or more factors to authenticate: something you know (password), something you have (phone/token), something you are (fingerprint). Prevents account takeover even if password leaked.",
        explanation: "Single factor (password) is weak - can be phished, leaked, guessed. MFA adds a second factor (usually phone app like Google Authenticator). Even if password stolen, attacker can't login without second factor. Enable for all privileged accounts (AWS root, GitHub admin, production access)."
    },
    {
        id: 101,
        category: "Security",
        difficulty: "Senior",
        question: "How do you implement encryption at rest for a database in AWS?",
        answer: "RDS: enable encryption at creation (KMS key), can't encrypt existing unencrypted DB (must snapshot + restore to encrypted). EBS: enable encryption in account settings (auto-encrypts new volumes). S3: SSE-S3, SSE-KMS, or SSE-C. Use KMS for key management, rotation, audit.",
        explanation: "Encryption at rest protects against physical theft, snapshot leaks. RDS encryption is all-or-nothing (can't encrypt after creation). KMS provides: key rotation, access control (IAM), audit (CloudTrail). SSE-S3 = AWS-managed keys (easy). SSE-KMS = customer-managed keys (more control). SSE-C = customer-provided keys (you manage)."
    },
    {
        id: 102,
        category: "Security",
        difficulty: "Mid",
        question: "What is a Web Application Firewall (WAF) and when should you use it?",
        answer: "Filters and monitors HTTP traffic to web apps. Protects against: SQL injection, XSS, DDoS, bots. Rule-based (block IPs, rate limit, detect attack patterns). Use for: public-facing apps, APIs, e-commerce.",
        explanation: "WAF sits in front of your app (CloudFront, ALB, API Gateway in AWS). Inspects requests, blocks malicious ones. AWS WAF: managed rules (OWASP Top 10), custom rules. Protects app layer (Layer 7) attacks. Combine with DDoS protection (Shield). Can be expensive - evaluate cost vs risk."
    }
];
