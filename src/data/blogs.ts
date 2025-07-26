export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  coverImage: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Microservices with .NET Core and Azure',
    excerpt: 'A comprehensive guide to architecting and implementing microservices using .NET Core, Docker, and Azure Kubernetes Service.',
    content: `# Building Scalable Microservices with .NET Core and Azure

## Introduction
In today's rapidly evolving software landscape, microservices architecture has become the gold standard for building scalable, maintainable applications. This comprehensive guide will walk you through the process of designing, implementing, and deploying microservices using .NET Core and Azure.

## Why Microservices?

### Benefits
- **Scalability**: Scale individual services based on demand
- **Technology Diversity**: Use the right tool for each service
- **Team Autonomy**: Independent development and deployment
- **Fault Isolation**: Service failures don't bring down the entire system

### Challenges
- **Distributed System Complexity**: Network latency, data consistency
- **Service Discovery**: How services find and communicate with each other
- **Monitoring**: Observability across multiple services
- **Data Management**: Handling distributed data

## Architecture Overview

Our microservices platform will include:
- **API Gateway**: Single entry point for client requests
- **Service Discovery**: Automatic service registration and discovery
- **Configuration Management**: Centralized configuration
- **Monitoring & Logging**: Distributed tracing and centralized logging

## Implementation with .NET Core

### 1. Creating a Microservice

\`\`\`csharp
[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrderController> _logger;
    
    public OrderController(IOrderService orderService, ILogger<OrderController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }
    
    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder([FromBody] CreateOrderRequest request)
    {
        try
        {
            _logger.LogInformation("Creating order for customer {CustomerId}", request.CustomerId);
            var order = await _orderService.CreateOrderAsync(request);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order");
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _orderService.GetOrderAsync(id);
        return order == null ? NotFound() : Ok(order);
    }
}
\`\`\`

### 2. Service Communication

For service-to-service communication, we'll use HTTP clients with circuit breaker pattern:

\`\`\`csharp
public class PaymentService : IPaymentService
{
    private readonly HttpClient _httpClient;
    private readonly ICircuitBreaker _circuitBreaker;
    
    public PaymentService(HttpClient httpClient, ICircuitBreaker circuitBreaker)
    {
        _httpClient = httpClient;
        _circuitBreaker = circuitBreaker;
    }
    
    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        return await _circuitBreaker.ExecuteAsync(async () =>
        {
            var response = await _httpClient.PostAsJsonAsync("/api/payments", request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<PaymentResult>();
        });
    }
}
\`\`\`

## Azure Integration

### 1. Azure Kubernetes Service (AKS)

Deploy your microservices to AKS for orchestration:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
      - name: order-service
        image: myregistry.azurecr.io/order-service:latest
        ports:
        - containerPort: 80
        env:
        - name: ConnectionStrings__DefaultConnection
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: connection-string
\`\`\`

### 2. Azure Service Bus

For asynchronous communication between services:

\`\`\`csharp
public class OrderEventPublisher : IOrderEventPublisher
{
    private readonly ServiceBusClient _serviceBusClient;
    private readonly ServiceBusSender _sender;
    
    public OrderEventPublisher(ServiceBusClient serviceBusClient)
    {
        _serviceBusClient = serviceBusClient;
        _sender = _serviceBusClient.CreateSender("order-events");
    }
    
    public async Task PublishOrderCreatedAsync(OrderCreatedEvent orderEvent)
    {
        var message = new ServiceBusMessage(JsonSerializer.Serialize(orderEvent))
        {
            Subject = "OrderCreated",
            ContentType = "application/json"
        };
        
        await _sender.SendMessageAsync(message);
    }
}
\`\`\`

### 3. Azure Application Insights

Add comprehensive monitoring:

\`\`\`csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddApplicationInsightsTelemetry();
    services.AddApplicationInsightsKubernetesEnricher();
    
    // Add custom telemetry
    services.AddSingleton<ITelemetryInitializer, ServiceNameTelemetryInitializer>();
}
\`\`\`

## Best Practices

### 1. Health Checks
Implement health checks for service monitoring:

\`\`\`csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddHealthChecks()
        .AddSqlServer(connectionString)
        .AddServiceBusQueue("order-queue")
        .AddApplicationInsightsPublisher();
}
\`\`\`

### 2. Distributed Caching
Use Redis for shared caching:

\`\`\`csharp
services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "your-redis-connection-string";
});
\`\`\`

### 3. Configuration Management
Use Azure Key Vault for sensitive configuration:

\`\`\`csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration((context, config) =>
        {
            if (context.HostingEnvironment.IsProduction())
            {
                var builtConfig = config.Build();
                config.AddAzureKeyVault(
                    $"https://{builtConfig["KeyVaultName"]}.vault.azure.net/",
                    builtConfig["AzureADApplicationId"],
                    builtConfig["AzureADPassword"]);
            }
        });
\`\`\`

## Deployment Strategy

### 1. CI/CD Pipeline
Use Azure DevOps for automated deployment:

\`\`\`yaml
trigger:
  branches:
    include:
    - main
  paths:
    include:
    - src/OrderService/*

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'

stages:
- stage: Build
  jobs:
  - job: Build
    steps:
    - task: DotNetCoreCLI@2
      inputs:
        command: 'restore'
        projects: 'src/OrderService/*.csproj'
    
    - task: DotNetCoreCLI@2
      inputs:
        command: 'build'
        projects: 'src/OrderService/*.csproj'
        arguments: '--configuration $(buildConfiguration) --no-restore'
    
    - task: DotNetCoreCLI@2
      inputs:
        command: 'test'
        projects: 'tests/OrderService.Tests/*.csproj'
        arguments: '--configuration $(buildConfiguration) --no-build'

- stage: Deploy
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: DeployToAKS
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: KubernetesManifest@0
            inputs:
              action: 'deploy'
              manifests: 'k8s/order-service.yaml'
\`\`\`

## Monitoring and Observability

### 1. Distributed Tracing
Implement distributed tracing with Application Insights:

\`\`\`csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseCorrelationId();
    app.UseRequestLogging();
    
    // Add trace correlation
    app.Use(async (context, next) =>
    {
        using var activity = ActivitySource.StartActivity("HTTP Request");
        activity?.SetTag("http.method", context.Request.Method);
        activity?.SetTag("http.url", context.Request.GetDisplayUrl());
        
        await next();
        
        activity?.SetTag("http.status_code", context.Response.StatusCode);
    });
}
\`\`\`

### 2. Metrics Collection
Define custom metrics:

\`\`\`csharp
public class OrderMetrics
{
    private readonly Counter<int> _ordersCreated;
    private readonly Histogram<double> _orderProcessingTime;
    
    public OrderMetrics(IMeterFactory meterFactory)
    {
        var meter = meterFactory.Create("OrderService");
        _ordersCreated = meter.CreateCounter<int>("orders_created_total");
        _orderProcessingTime = meter.CreateHistogram<double>("order_processing_duration_seconds");
    }
    
    public void IncrementOrdersCreated() => _ordersCreated.Add(1);
    
    public void RecordOrderProcessingTime(double seconds) => 
        _orderProcessingTime.Record(seconds);
}
\`\`\`

## Conclusion

Building microservices with .NET Core and Azure provides a robust foundation for modern applications. Key takeaways:

1. **Start Simple**: Begin with a modular monolith and extract services gradually
2. **Embrace DevOps**: Automation is crucial for managing multiple services
3. **Monitor Everything**: Comprehensive observability is essential
4. **Design for Failure**: Implement circuit breakers, retries, and graceful degradation
5. **Security First**: Secure service-to-service communication and data

The combination of .NET Core's performance and Azure's cloud services provides an excellent platform for scalable microservices architecture.

## Resources

- [.NET Microservices Architecture Guidance](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/)
- [Azure Kubernetes Service Documentation](https://docs.microsoft.com/en-us/azure/aks/)
- [Azure Service Bus Documentation](https://docs.microsoft.com/en-us/azure/service-bus-messaging/)
- [Application Insights Documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)`,
    author: 'Nitin Rahane',
    publishDate: '2024-01-15',
    readTime: '15 min read',
    category: 'Architecture',
    tags: ['.NET Core', 'Azure', 'Microservices', 'Docker', 'Kubernetes'],
    featured: true,
    coverImage: '/blog/microservices-dotnet-azure.jpg',
    slug: 'building-scalable-microservices-dotnet-azure'
  },
  {
    id: '2',
    title: 'React Performance Optimization: Advanced Techniques',
    excerpt: 'Deep dive into React performance optimization techniques including code splitting, lazy loading, and memoization strategies.',
    content: `# React Performance Optimization: Advanced Techniques

## Introduction
React applications can become slow as they grow. This comprehensive guide covers advanced techniques to keep your React apps lightning fast, from initial load to complex user interactions.

## Understanding React Performance

### The React Rendering Process
1. **Trigger**: State change or prop update
2. **Render**: React calls component functions
3. **Reconciliation**: Comparing new and previous virtual DOM
4. **Commit**: Updating the actual DOM

### Common Performance Bottlenecks
- Large bundle sizes
- Unnecessary re-renders
- Heavy computations on every render
- Inefficient list rendering
- Memory leaks

## Code Splitting and Lazy Loading

### 1. Route-based Code Splitting

\`\`\`jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
\`\`\`

### 2. Component-based Code Splitting

\`\`\`jsx
import { lazy, Suspense, useState } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setShowChart(true)}>
        Load Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
\`\`\`

## Memoization Strategies

### 1. React.memo for Component Memoization

\`\`\`jsx
import { memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onUpdate }) {
  // Expensive rendering logic
  const processedData = data.map(item => ({
    ...item,
    processed: true,
    timestamp: Date.now()
  }));

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => onUpdate(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.data.length === nextProps.data.length &&
         prevProps.onUpdate === nextProps.onUpdate;
});
\`\`\`

### 2. useMemo for Value Memoization

\`\`\`jsx
import { useMemo, useState } from 'react';

function DataProcessor({ rawData, filters }) {
  const [sortOrder, setSortOrder] = useState('asc');

  // Memoize expensive calculations
  const processedData = useMemo(() => {
    console.log('Processing data...'); // This should only log when dependencies change
    
    return rawData
      .filter(item => filters.every(filter => filter(item)))
      .sort((a, b) => {
        return sortOrder === 'asc' 
          ? a.value - b.value 
          : b.value - a.value;
      });
  }, [rawData, filters, sortOrder]);

  const averageValue = useMemo(() => {
    return processedData.reduce((sum, item) => sum + item.value, 0) / processedData.length;
  }, [processedData]);

  return (
    <div>
      <p>Average: {averageValue}</p>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>
      {processedData.map(item => (
        <div key={item.id}>{item.name}: {item.value}</div>
      ))}
    </div>
  );
}
\`\`\`

### 3. useCallback for Function Memoization

\`\`\`jsx
import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // Without useCallback, this function is recreated on every render
  const handleItemClick = useCallback((id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []); // Empty dependency array since we're using functional updates

  const handleAddItem = useCallback(() => {
    setItems(prevItems => [...prevItems, { 
      id: Date.now(), 
      name: \`Item \${prevItems.length + 1}\`,
      selected: false 
    }]);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <button onClick={handleAddItem}>
        Add Item
      </button>
      <ItemList items={items} onItemClick={handleItemClick} />
    </div>
  );
}

const ItemList = memo(function ItemList({ items, onItemClick }) {
  console.log('ItemList rendered'); // Should only log when items change
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name} {item.selected ? '✓' : ''}
        </li>
      ))}
    </ul>
  );
});
\`\`\`

## Virtual Scrolling for Large Lists

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style} className="list-item">
      <h3>{items[index].title}</h3>
      <p>{items[index].description}</p>
    </div>
  );

  return (
    <List
      height={600} // Height of the scrollable area
      itemCount={items.length}
      itemSize={100} // Height of each item
      width="100%"
    >
      {Row}
    </List>
  );
}
\`\`\`

## State Management Optimization

### 1. State Colocation

\`\`\`jsx
// ❌ Bad: State in parent when only child needs it
function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Only used by SearchComponent

  return (
    <div>
      <Dashboard data={dashboardData} />
      <UserProfile profile={userProfile} />
      <SearchComponent query={searchQuery} setQuery={setSearchQuery} />
    </div>
  );
}

// ✅ Good: State colocated with component that uses it
function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  return (
    <div>
      <Dashboard data={dashboardData} />
      <UserProfile profile={userProfile} />
      <SearchComponent /> {/* Manages its own search state */}
    </div>
  );
}

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  // Component logic here
}
\`\`\`

### 2. State Splitting

\`\`\`jsx
// ❌ Bad: Single large state object
function FormComponent() {
  const [formState, setFormState] = useState({
    personalInfo: { name: '', email: '', phone: '' },
    address: { street: '', city: '', zipCode: '' },
    preferences: { theme: 'light', notifications: true },
    metadata: { lastSaved: null, isDirty: false }
  });

  // Any change causes entire component to re-render
  const updatePersonalInfo = (field, value) => {
    setFormState(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };
}

// ✅ Good: Split state by concern
function FormComponent() {
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '' });
  const [address, setAddress] = useState({ street: '', city: '', zipCode: '' });
  const [preferences, setPreferences] = useState({ theme: 'light', notifications: true });
  const [metadata, setMetadata] = useState({ lastSaved: null, isDirty: false });

  // Only personalInfo state triggers re-render when personal info changes
  const updatePersonalInfo = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };
}
\`\`\`

## Bundle Optimization

### 1. Webpack Bundle Analyzer

\`\`\`bash
npm install --save-dev webpack-bundle-analyzer

# Add to package.json scripts
"analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
\`\`\`

### 2. Tree Shaking

\`\`\`jsx
// ❌ Bad: Imports entire library
import * as _ from 'lodash';
import { Button, TextField, Dialog, Grid } from '@mui/material';

// ✅ Good: Import only what you need
import { debounce } from 'lodash';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
\`\`\`

### 3. Dynamic Imports for Third-party Libraries

\`\`\`jsx
import { useState } from 'react';

function ChartComponent({ data }) {
  const [ChartLibrary, setChartLibrary] = useState(null);

  useEffect(() => {
    // Load chart library only when needed
    import('chart.js').then(module => {
      setChartLibrary(module.default);
    });
  }, []);

  if (!ChartLibrary) {
    return <div>Loading chart...</div>;
  }

  // Render chart with loaded library
  return <canvas ref={canvasRef} />;
}
\`\`\`

## Performance Monitoring

### 1. React DevTools Profiler

\`\`\`jsx
import { Profiler } from 'react';

function App() {
  const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.log('Component:', id);
    console.log('Phase:', phase);
    console.log('Actual duration:', actualDuration);
    console.log('Base duration:', baseDuration);
  };

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
      <UserProfile />
    </Profiler>
  );
}
\`\`\`

### 2. Custom Performance Hook

\`\`\`jsx
import { useEffect, useRef } from 'react';

function usePerformanceMonitor(componentName) {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    console.log(\`\${componentName} - Render #\${renderCount.current} took \${renderTime}ms\`);

    startTime.current = performance.now();
  });

  return renderCount.current;
}

function MyComponent() {
  const renderCount = usePerformanceMonitor('MyComponent');
  
  return <div>Rendered {renderCount} times</div>;
}
\`\`\`

## Memory Leak Prevention

### 1. Cleanup Event Listeners

\`\`\`jsx
import { useEffect, useState } from 'react';

function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>{windowSize.width} x {windowSize.height}</div>;
}
\`\`\`

### 2. Cancel Async Operations

\`\`\`jsx
import { useEffect, useState } from 'react';

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortController.signal
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [url]);

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
\`\`\`

## Conclusion

React performance optimization is about making smart choices:

1. **Measure First**: Use React DevTools Profiler to identify bottlenecks
2. **Optimize Bundle Size**: Use code splitting and tree shaking
3. **Prevent Unnecessary Renders**: Use memoization strategically
4. **Manage State Wisely**: Colocate and split state appropriately
5. **Handle Large Data Sets**: Implement virtual scrolling
6. **Monitor Performance**: Set up performance tracking
7. **Prevent Memory Leaks**: Always cleanup resources

Remember: Premature optimization is the root of all evil. Profile first, then optimize based on actual performance data.`,
    author: 'Nitin Rahane',
    publishDate: '2024-01-10',
    readTime: '12 min read',
    category: 'Frontend',
    tags: ['React', 'Performance', 'TypeScript', 'Optimization'],
    featured: true,
    coverImage: '/blog/react-performance.jpg',
    slug: 'react-performance-optimization-techniques'
  },
  {
    id: '3',
    title: 'Azure DevOps CI/CD: From Zero to Production',
    excerpt: 'Complete guide to setting up CI/CD pipelines with Azure DevOps for .NET applications with automated testing and deployment.',
    content: `# Azure DevOps CI/CD: From Zero to Production

A complete guide to implementing robust CI/CD pipelines using Azure DevOps for .NET applications.

## Setting Up Your Pipeline

Learn how to create robust CI/CD pipelines that ensure quality deployments...

## YAML Pipeline Configuration

\`\`\`yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'

stages:
- stage: Build
  jobs:
  - job: Build
    steps:
    - task: DotNetCoreCLI@2
      inputs:
        command: 'restore'
        projects: '**/*.csproj'
\`\`\`

Continue reading for more detailed implementation...`,
    author: 'Nitin Rahane',
    publishDate: '2024-01-05',
    readTime: '15 min read',
    category: 'DevOps',
    tags: ['Azure DevOps', 'CI/CD', '.NET', 'Deployment'],
    featured: false,
    coverImage: '/blog/azure-devops-cicd.jpg',
    slug: 'azure-devops-cicd-zero-to-production'
  },
  {
    id: '4',
    title: 'Entity Framework Core: Advanced Querying Techniques',
    excerpt: 'Master complex database operations with Entity Framework Core including performance optimization and best practices.',
    content: `# Entity Framework Core: Advanced Querying Techniques

Master complex database operations with Entity Framework Core...`,
    author: 'Nitin Rahane',
    publishDate: '2023-12-28',
    readTime: '10 min read',
    category: 'Backend',
    tags: ['Entity Framework', '.NET Core', 'Database', 'SQL'],
    featured: false,
    coverImage: '/blog/entity-framework.jpg',
    slug: 'entity-framework-core-advanced-querying'
  },
  {
    id: '5',
    title: 'Modern Authentication in React with Azure AD',
    excerpt: 'Implement secure authentication in React applications using Azure Active Directory and Microsoft Authentication Library.',
    content: `# Modern Authentication in React with Azure AD

Security is paramount in modern web applications...`,
    author: 'Nitin Rahane',
    publishDate: '2023-12-20',
    readTime: '7 min read',
    category: 'Security',
    tags: ['React', 'Azure AD', 'Authentication', 'Security'],
    featured: false,
    coverImage: '/blog/react-azure-auth.jpg',
    slug: 'modern-authentication-react-azure-ad'
  },
  {
    id: '6',
    title: 'Leadership in Tech: Mentoring Development Teams',
    excerpt: 'Insights on technical leadership, team mentoring, and building high-performing development teams.',
    content: `# Leadership in Tech: Mentoring Development Teams

Leading technical teams requires more than just coding skills...`,
    author: 'Nitin Rahane',
    publishDate: '2023-12-15',
    readTime: '5 min read',
    category: 'Leadership',
    tags: ['Leadership', 'Mentoring', 'Team Management', 'Career'],
    featured: false,
    coverImage: '/blog/tech-leadership.jpg',
    slug: 'leadership-tech-mentoring-teams'
  }
];

export const blogCategories = [
  'All',
  'Architecture',
  'Frontend', 
  'Backend',
  'DevOps',
  'Security',
  'Leadership'
];
