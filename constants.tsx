import { 
  ShieldAlert, 
  Activity, 
  Search,
  Globe
} from 'lucide-react';
import { ArchitectureNode, Connection, TechStack } from './types';
import { AzureIcon, DatabricksIcon } from './components/CustomIcons';

export const NODES: ArchitectureNode[] = [
  {
    id: 'sources',
    label: 'Ingestion Layer',
    subLabel: 'Data Sources & Intake',
    description: `Data flows in from Microsoft and LSEG sources:
• Transaction streams
• User/account data
• Device metadata
• Geo/IP data
• Labels & fraud-case logs

Streaming data enters via EventHub.
Batch data enters via Data Factory.

Why this step matters:
You need raw, continuous data to power fraud detection. Without this, the model cannot function.`,
    techStack: TechStack.AZURE,
    techDetails: ['Azure Data Factory', 'Azure Event Hubs', 'API Connectors', 'Data Intake Agent'],
    icon: AzureIcon,
    x: 5,
    y: 40,
  },
  {
    id: 'agents',
    label: 'Autonomous Agents',
    subLabel: 'Agentic AI (ETL)',
    description: 'Automated scripts for data extraction, transformation, and loading. Handles schema inference, data validation, deduplication, and near real-time processing using Databricks Auto Loader.',
    techStack: TechStack.DATABRICKS,
    techDetails: ['Databricks Workflows', 'Auto Loader', 'Delta Live Tables', 'Spark Structured Streaming'],
    icon: DatabricksIcon,
    x: 25,
    y: 40,
  },
  {
    id: 'storage',
    label: 'Unified Data Storage',
    subLabel: 'Delta Lake',
    description: 'Centralized storage layer supporting ACID transactions. Houses raw, standardized, and modeled data in a medallion architecture (Bronze/Silver/Gold).',
    techStack: TechStack.DATABRICKS,
    techDetails: ['Azure Data Lake Gen2', 'Delta Lake', 'Unity Catalog'],
    icon: DatabricksIcon,
    x: 25,
    y: 75,
  },
  {
    id: 'features',
    label: 'Feature Engineering',
    subLabel: 'Variable Derivation',
    description: 'Derives new variables from raw data (e.g., transaction frequency, velocity, network patterns). Uses domain expertise and statistical methods to prepare data for ML models.',
    techStack: TechStack.DATABRICKS,
    techDetails: ['Databricks Feature Store', 'PySpark', 'Pandas API on Spark'],
    icon: DatabricksIcon,
    x: 50,
    y: 25,
  },
  {
    id: 'graph',
    label: 'Knowledge Graph',
    subLabel: 'Entity Relations',
    description: 'Maps complex relationships between entities to detect organized fraud rings. Enriched by outputs from the fraud model.',
    techStack: TechStack.AZURE,
    techDetails: ['Azure Cosmos DB (Gremlin API)', 'GraphFrames'],
    icon: AzureIcon,
    x: 50,
    y: 75,
  },
  {
    id: 'vector',
    label: 'Vector Search',
    subLabel: 'Similarity Search',
    description: 'Enables semantic search capabilities over unstructured data to find similar fraud patterns across the dataset.',
    techStack: TechStack.DATABRICKS,
    techDetails: ['Databricks Vector Search', 'Mosaic AI'],
    icon: Search,
    x: 40,
    y: 60,
  },
  {
    id: 'model',
    label: 'APP Fraud Model',
    subLabel: 'Scoring Engine',
    description: 'Machine Learning models (e.g., XGBoost, Deep Learning) that predict fraud probability (0-1). Interprets manager data linearly and outputs a risk score.',
    techStack: TechStack.DATABRICKS,
    techDetails: ['MLflow', 'Azure Machine Learning', 'XGBoost', 'TensorFlow'],
    icon: DatabricksIcon,
    x: 70,
    y: 60,
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    subLabel: 'Product Consumption',
    description: 'Secure entry point for external systems to consume fraud scores and alerts. Manages traffic, rate limiting, and authentication.',
    techStack: TechStack.AZURE,
    techDetails: ['Azure API Management', 'Azure Functions'],
    icon: Globe,
    x: 70,
    y: 35,
  },
  {
    id: 'alerts',
    label: 'Fraud Detection & Alerts',
    subLabel: 'Decisioning',
    description: 'Rule-based systems combined with model thresholds. Triggers review teams when scores cross specific limits. Includes feedback loops for model retraining.',
    techStack: TechStack.GENERIC,
    techDetails: ['Power BI', 'Custom Dashboards', 'Logic Apps'],
    icon: ShieldAlert,
    x: 90,
    y: 25,
  },
  {
    id: 'anomaly',
    label: 'Anomaly Detection',
    subLabel: 'Unsupervised AI',
    description: 'Unsupervised learning algorithms (Isolation Forest, Autoencoders) to detect novel fraud patterns not captured by supervised models.',
    techStack: TechStack.DATABRICKS,
    techDetails: ['Isolation Forest', 'Autoencoders', 'Model Monitoring'],
    icon: Activity,
    x: 90,
    y: 75,
  },
];

export const CONNECTIONS: Connection[] = [
  { from: 'sources', to: 'agents' },
  { from: 'agents', to: 'storage' },
  { from: 'agents', to: 'features' },
  { from: 'storage', to: 'vector' },
  { from: 'vector', to: 'model' }, // Implicit via vector lookup
  { from: 'features', to: 'gateway' },
  { from: 'features', to: 'model' },
  { from: 'storage', to: 'graph' }, // Data feeds graph
  { from: 'model', to: 'graph' }, // Model enriches graph
  { from: 'graph', to: 'model' }, // Graph features feed model
  { from: 'model', to: 'gateway' },
  { from: 'model', to: 'anomaly' },
  { from: 'gateway', to: 'alerts' },
  { from: 'gateway', to: 'anomaly' },
  { from: 'anomaly', to: 'model', label: 'Feedback Loop', curved: true },
  { from: 'alerts', to: 'model', label: 'Retraining', curved: true },
];