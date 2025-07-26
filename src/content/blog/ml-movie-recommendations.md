---
title: "Building a Movie Recommendation System with Python & Machine Learning"
description: "Learn to build an intelligent movie recommendation system using collaborative filtering, content-based filtering, and hybrid approaches with Python, pandas, and scikit-learn."
date: "2025-01-04"
author: "Your Name"
tags: ["python", "machine-learning", "data-science", "recommendation-system", "pandas"]
category: "Data Science"
readTime: "20 min read"
featured: true
---

# Building a Movie Recommendation System with Python & Machine Learning

Recommendation systems power some of the most successful platforms today - from Netflix's movie suggestions to Amazon's product recommendations. Let's build a comprehensive movie recommendation system from scratch using Python and machine learning.

## What We'll Build

Our recommendation system will include:
- 🎬 **Content-based filtering** - Based on movie features
- 👥 **Collaborative filtering** - Based on user behavior  
- 🚀 **Hybrid approach** - Combining both methods
- 📊 **Interactive dashboard** - For exploring recommendations
- ⚡ **Real-time predictions** - Fast recommendation engine

## Project Setup

First, let's set up our environment and install required packages:

```bash
pip install pandas numpy scikit-learn matplotlib seaborn flask plotly
pip install surprise jupyter notebook
```

## Dataset Preparation

We'll use the MovieLens dataset. Create `data_loader.py`:

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import warnings
warnings.filterwarnings('ignore')

class MovieDataLoader:
    def __init__(self, data_path='data/'):
        self.data_path = data_path
        self.movies = None
        self.ratings = None
        self.tags = None
        
    def load_data(self):
        """Load MovieLens dataset"""
        try:
            # Load movies data
            self.movies = pd.read_csv(f'{self.data_path}movies.csv')
            print(f"Movies loaded: {self.movies.shape}")
            
            # Load ratings data
            self.ratings = pd.read_csv(f'{self.data_path}ratings.csv')
            print(f"Ratings loaded: {self.ratings.shape}")
            
            # Load tags data (optional)
            try:
                self.tags = pd.read_csv(f'{self.data_path}tags.csv')
                print(f"Tags loaded: {self.tags.shape}")
            except FileNotFoundError:
                print("Tags file not found, proceeding without tags")
                
        except FileNotFoundError as e:
            print(f"Error loading data: {e}")
            print("Download MovieLens dataset from: https://grouplens.org/datasets/movielens/")
            
    def preprocess_data(self):
        """Clean and preprocess the data"""
        if self.movies is None or self.ratings is None:
            print("Please load data first using load_data()")
            return
            
        # Parse genres
        self.movies['genres'] = self.movies['genres'].str.split('|')
        
        # Extract year from title
        self.movies['year'] = self.movies['title'].str.extract(r'\((\d{4})\)')
        self.movies['year'] = pd.to_numeric(self.movies['year'], errors='coerce')
        
        # Clean title
        self.movies['clean_title'] = self.movies['title'].str.replace(r'\s*\(\d{4}\)\s*$', '', regex=True)
        
        # Create user-item matrix
        self.user_item_matrix = self.ratings.pivot_table(
            index='userId', 
            columns='movieId', 
            values='rating'
        ).fillna(0)
        
        # Calculate movie statistics
        movie_stats = self.ratings.groupby('movieId').agg({
            'rating': ['count', 'mean', 'std']
        }).round(2)
        
        movie_stats.columns = ['rating_count', 'rating_mean', 'rating_std']
        movie_stats = movie_stats.reset_index()
        
        # Merge with movies data
        self.movies = self.movies.merge(movie_stats, on='movieId', how='left')
        
        print("Data preprocessing completed!")
        
    def get_popular_movies(self, min_ratings=100, top_n=20):
        """Get most popular movies based on rating count and average rating"""
        if self.movies is None:
            print("Please load and preprocess data first")
            return None
            
        popular = self.movies[
            self.movies['rating_count'] >= min_ratings
        ].sort_values(['rating_mean', 'rating_count'], ascending=False)
        
        return popular.head(top_n)[['title', 'genres', 'year', 'rating_mean', 'rating_count']]

# Usage
loader = MovieDataLoader()
loader.load_data()
loader.preprocess_data()

print("\nTop 10 Popular Movies:")
print(loader.get_popular_movies(top_n=10))
```

## Content-Based Recommendation System

Create `content_recommender.py`:

```python
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler

class ContentBasedRecommender:
    def __init__(self, movies_df):
        self.movies_df = movies_df.copy()
        self.feature_matrix = None
        self.similarity_matrix = None
        self.setup_features()
        
    def setup_features(self):
        """Create feature matrix from movie metadata"""
        # Process genres
        genres_df = self.movies_df['genres'].apply(
            lambda x: ' '.join(x) if isinstance(x, list) else ''
        )
        
        # TF-IDF for genres
        tfidf_genres = TfidfVectorizer(stop_words='english', lowercase=True)
        genres_matrix = tfidf_genres.fit_transform(genres_df)
        
        # Normalize year feature
        year_feature = self.movies_df['year'].fillna(self.movies_df['year'].median())
        year_scaler = StandardScaler()
        year_normalized = year_scaler.fit_transform(year_feature.values.reshape(-1, 1))
        
        # Normalize rating features
        rating_features = self.movies_df[['rating_mean', 'rating_count']].fillna(0)
        rating_scaler = StandardScaler()
        rating_normalized = rating_scaler.fit_transform(rating_features)
        
        # Combine features
        self.feature_matrix = np.hstack([
            genres_matrix.toarray(),
            year_normalized,
            rating_normalized
        ])
        
        # Calculate similarity matrix
        self.similarity_matrix = cosine_similarity(self.feature_matrix)
        print(f"Feature matrix shape: {self.feature_matrix.shape}")
        
    def get_recommendations(self, movie_title, top_n=10):
        """Get content-based recommendations for a movie"""
        try:
            # Find movie index
            movie_idx = self.movies_df[
                self.movies_df['clean_title'].str.contains(movie_title, case=False, na=False)
            ].index[0]
            
            # Get similarity scores
            sim_scores = list(enumerate(self.similarity_matrix[movie_idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            
            # Get top similar movies (excluding the input movie)
            similar_movies = sim_scores[1:top_n+1]
            movie_indices = [i[0] for i in similar_movies]
            
            recommendations = self.movies_df.iloc[movie_indices][[
                'title', 'genres', 'year', 'rating_mean', 'rating_count'
            ]].copy()
            
            recommendations['similarity_score'] = [score[1] for score in similar_movies]
            
            return recommendations
            
        except IndexError:
            print(f"Movie '{movie_title}' not found in dataset")
            return None
            
    def get_genre_recommendations(self, preferred_genres, top_n=20):
        """Recommend movies based on preferred genres"""
        genre_scores = []
        
        for idx, movie_genres in enumerate(self.movies_df['genres']):
            if isinstance(movie_genres, list):
                # Calculate genre overlap score
                overlap = len(set(movie_genres) & set(preferred_genres))
                total_genres = len(set(movie_genres) | set(preferred_genres))
                score = overlap / total_genres if total_genres > 0 else 0
                genre_scores.append((idx, score))
                
        # Sort by genre score and rating
        genre_scores = sorted(genre_scores, key=lambda x: x[1], reverse=True)
        top_indices = [idx for idx, score in genre_scores[:top_n*2]]
        
        recommendations = self.movies_df.iloc[top_indices]
        recommendations = recommendations[recommendations['rating_count'] >= 50]
        
        return recommendations.head(top_n)[[
            'title', 'genres', 'year', 'rating_mean', 'rating_count'
        ]]

# Example usage
content_rec = ContentBasedRecommender(loader.movies)

print("\nContent-based recommendations for 'Toy Story':")
toy_story_recs = content_rec.get_recommendations('Toy Story', top_n=5)
print(toy_story_recs)

print("\nGenre-based recommendations for Action|Adventure:")
genre_recs = content_rec.get_genre_recommendations(['Action', 'Adventure'], top_n=5)
print(genre_recs)
```

## Collaborative Filtering System

Create `collaborative_recommender.py`:

```python
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
from surprise import Dataset, Reader, SVD, accuracy
from surprise.model_selection import train_test_split

class CollaborativeRecommender:
    def __init__(self, ratings_df, movies_df):
        self.ratings_df = ratings_df
        self.movies_df = movies_df
        self.user_item_matrix = None
        self.user_similarity = None
        self.item_similarity = None
        self.svd_model = None
        self.setup_matrices()
        
    def setup_matrices(self):
        """Setup user-item matrices and similarity matrices"""
        # Create user-item matrix
        self.user_item_matrix = self.ratings_df.pivot_table(
            index='userId', 
            columns='movieId', 
            values='rating'
        ).fillna(0)
        
        print(f"User-item matrix shape: {self.user_item_matrix.shape}")
        
        # Calculate user similarity (memory intensive, use sample for large datasets)
        if self.user_item_matrix.shape[0] <= 1000:
            self.user_similarity = cosine_similarity(self.user_item_matrix)
            print("User similarity matrix calculated")
        
        # Calculate item similarity
        if self.user_item_matrix.shape[1] <= 2000:
            self.item_similarity = cosine_similarity(self.user_item_matrix.T)
            print("Item similarity matrix calculated")
            
    def train_svd_model(self):
        """Train SVD model using Surprise library"""
        # Prepare data for Surprise
        reader = Reader(rating_scale=(0.5, 5.0))
        data = Dataset.load_from_df(
            self.ratings_df[['userId', 'movieId', 'rating']], 
            reader
        )
        
        # Split data
        trainset, testset = train_test_split(data, test_size=.2, random_state=42)
        
        # Train SVD model
        self.svd_model = SVD(n_factors=100, n_epochs=20, random_state=42)
        self.svd_model.fit(trainset)
        
        # Test accuracy
        predictions = self.svd_model.test(testset)
        rmse = accuracy.rmse(predictions)
        print(f"SVD Model RMSE: {rmse:.4f}")
        
        return rmse
        
    def get_user_recommendations(self, user_id, top_n=10):
        """Get recommendations for a specific user using SVD"""
        if self.svd_model is None:
            print("Please train SVD model first")
            return None
            
        # Get movies the user hasn't rated
        user_ratings = self.ratings_df[self.ratings_df['userId'] == user_id]['movieId'].tolist()
        all_movies = self.movies_df['movieId'].tolist()
        unrated_movies = list(set(all_movies) - set(user_ratings))
        
        # Predict ratings for unrated movies
        predictions = []
        for movie_id in unrated_movies:
            pred = self.svd_model.predict(user_id, movie_id)
            predictions.append((movie_id, pred.est))
            
        # Sort by predicted rating
        predictions.sort(key=lambda x: x[1], reverse=True)
        top_movie_ids = [movie_id for movie_id, rating in predictions[:top_n]]
        
        # Get movie details
        recommendations = self.movies_df[
            self.movies_df['movieId'].isin(top_movie_ids)
        ][['movieId', 'title', 'genres', 'year', 'rating_mean']]
        
        # Add predicted ratings
        pred_ratings = {movie_id: rating for movie_id, rating in predictions[:top_n]}
        recommendations['predicted_rating'] = recommendations['movieId'].map(pred_ratings)
        
        return recommendations.sort_values('predicted_rating', ascending=False)
        
    def get_item_based_recommendations(self, movie_id, top_n=10):
        """Get recommendations using item-based collaborative filtering"""
        if self.item_similarity is None:
            print("Item similarity matrix not available")
            return None
            
        try:
            # Find movie index in the matrix
            movie_idx = list(self.user_item_matrix.columns).index(movie_id)
            
            # Get similarity scores
            sim_scores = list(enumerate(self.item_similarity[movie_idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            
            # Get top similar movies
            similar_movies = sim_scores[1:top_n+1]
            movie_indices = [i[0] for i in similar_movies]
            
            # Get movie IDs and details
            recommended_movie_ids = [
                self.user_item_matrix.columns[idx] for idx in movie_indices
            ]
            
            recommendations = self.movies_df[
                self.movies_df['movieId'].isin(recommended_movie_ids)
            ][['title', 'genres', 'year', 'rating_mean']]
            
            recommendations['similarity_score'] = [score[1] for score in similar_movies]
            
            return recommendations.sort_values('similarity_score', ascending=False)
            
        except ValueError:
            print(f"Movie ID {movie_id} not found in ratings data")
            return None

# Example usage
collab_rec = CollaborativeRecommender(loader.ratings, loader.movies)

# Train SVD model
print("Training SVD model...")
rmse = collab_rec.train_svd_model()

# Get recommendations for user
print(f"\nRecommendations for User 1:")
user_recs = collab_rec.get_user_recommendations(user_id=1, top_n=5)
if user_recs is not None:
    print(user_recs)

# Get item-based recommendations
print(f"\nItem-based recommendations for Toy Story (movieId=1):")
item_recs = collab_rec.get_item_based_recommendations(movie_id=1, top_n=5)
if item_recs is not None:
    print(item_recs)
```

## Hybrid Recommendation System

Create `hybrid_recommender.py`:

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

class HybridRecommender:
    def __init__(self, content_recommender, collaborative_recommender):
        self.content_rec = content_recommender
        self.collab_rec = collaborative_recommender
        self.scaler = MinMaxScaler()
        
    def get_hybrid_recommendations(self, user_id=None, movie_title=None, 
                                 content_weight=0.3, collab_weight=0.7, top_n=10):
        """
        Get hybrid recommendations combining content and collaborative filtering
        """
        recommendations = []
        
        # Content-based recommendations
        if movie_title:
            content_recs = self.content_rec.get_recommendations(movie_title, top_n=20)
            if content_recs is not None:
                content_recs['content_score'] = self.scaler.fit_transform(
                    content_recs[['similarity_score']]
                )
                recommendations.append(('content', content_recs))
        
        # Collaborative filtering recommendations
        if user_id and self.collab_rec.svd_model:
            collab_recs = self.collab_rec.get_user_recommendations(user_id, top_n=20)
            if collab_recs is not None:
                collab_recs['collab_score'] = self.scaler.fit_transform(
                    collab_recs[['predicted_rating']]
                )
                recommendations.append(('collaborative', collab_recs))
        
        if not recommendations:
            print("No recommendations could be generated")
            return None
            
        # Combine recommendations
        if len(recommendations) == 2:
            # Both content and collaborative
            content_df = recommendations[0][1]
            collab_df = recommendations[1][1]
            
            # Merge on movie title (simplified approach)
            merged = pd.merge(
                content_df[['title', 'content_score']], 
                collab_df[['title', 'collab_score']], 
                on='title', 
                how='outer'
            ).fillna(0)
            
            # Calculate hybrid score
            merged['hybrid_score'] = (
                content_weight * merged['content_score'] + 
                collab_weight * merged['collab_score']
            )
            
            # Get full movie details
            final_recs = pd.merge(
                merged.sort_values('hybrid_score', ascending=False).head(top_n),
                self.content_rec.movies_df[['title', 'genres', 'year', 'rating_mean']],
                on='title',
                how='left'
            )
            
            return final_recs
            
        else:
            # Only one type of recommendation available
            rec_type, rec_df = recommendations[0]
            if rec_type == 'content':
                return rec_df.head(top_n)
            else:
                return rec_df.head(top_n)
                
    def get_cold_start_recommendations(self, preferred_genres=None, min_year=2000):
        """
        Recommendations for new users (cold start problem)
        """
        if preferred_genres:
            # Genre-based recommendations
            genre_recs = self.content_rec.get_genre_recommendations(
                preferred_genres, top_n=15
            )
        else:
            # Popular movies recommendations
            genre_recs = self.content_rec.movies_df[
                (self.content_rec.movies_df['year'] >= min_year) &
                (self.content_rec.movies_df['rating_count'] >= 100)
            ].sort_values(['rating_mean', 'rating_count'], ascending=False).head(15)
            
        return genre_recs
        
    def explain_recommendation(self, movie_title, user_id=None):
        """
        Provide explanation for why a movie was recommended
        """
        explanations = []
        
        # Check if it's content-based
        content_recs = self.content_rec.get_recommendations(movie_title, top_n=5)
        if content_recs is not None and len(content_recs) > 0:
            explanations.append(
                f"Recommended because you might like movies similar to '{movie_title}'"
            )
            
        # Check user's rating history
        if user_id:
            user_ratings = self.collab_rec.ratings_df[
                self.collab_rec.ratings_df['userId'] == user_id
            ]
            high_rated = user_ratings[user_ratings['rating'] >= 4.0]
            
            if len(high_rated) > 0:
                avg_rating = high_rated['rating'].mean()
                explanations.append(
                    f"Based on your average rating of {avg_rating:.1f} for similar movies"
                )
                
        return explanations

# Example usage
hybrid_rec = HybridRecommender(content_rec, collab_rec)

print("Hybrid recommendations (content + collaborative):")
hybrid_recs = hybrid_rec.get_hybrid_recommendations(
    user_id=1, 
    movie_title='Toy Story', 
    top_n=5
)
if hybrid_recs is not None:
    print(hybrid_recs)

print("\nCold start recommendations for new user (Action, Sci-Fi):")
cold_start = hybrid_rec.get_cold_start_recommendations(['Action', 'Sci-Fi'])
print(cold_start.head())
```

## Evaluation Metrics

Create `evaluation.py`:

```python
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error
import matplotlib.pyplot as plt
import seaborn as sns

class RecommendationEvaluator:
    def __init__(self, test_ratings, movies_df):
        self.test_ratings = test_ratings
        self.movies_df = movies_df
        
    def calculate_rmse(self, predictions, actual):
        """Calculate Root Mean Square Error"""
        return np.sqrt(mean_squared_error(actual, predictions))
        
    def calculate_mae(self, predictions, actual):
        """Calculate Mean Absolute Error"""
        return mean_absolute_error(actual, predictions)
        
    def calculate_precision_recall_at_k(self, recommendations, user_ratings, k=10):
        """Calculate Precision and Recall at K"""
        # Get top K recommendations
        top_k_recs = recommendations.head(k)['movieId'].tolist()
        
        # Get movies user actually liked (rating >= 4)
        liked_movies = user_ratings[user_ratings['rating'] >= 4.0]['movieId'].tolist()
        
        # Calculate precision and recall
        relevant_recommended = len(set(top_k_recs) & set(liked_movies))
        
        precision = relevant_recommended / k if k > 0 else 0
        recall = relevant_recommended / len(liked_movies) if len(liked_movies) > 0 else 0
        
        return precision, recall
        
    def calculate_diversity(self, recommendations):
        """Calculate diversity of recommendations based on genres"""
        if 'movieId' not in recommendations.columns:
            return 0
            
        rec_movies = pd.merge(
            recommendations, 
            self.movies_df[['movieId', 'genres']], 
            on='movieId'
        )
        
        all_genres = set()
        for genres_list in rec_movies['genres']:
            if isinstance(genres_list, list):
                all_genres.update(genres_list)
                
        return len(all_genres)
        
    def calculate_novelty(self, recommendations, all_ratings):
        """Calculate novelty - how uncommon the recommended movies are"""
        if 'movieId' not in recommendations.columns:
            return 0
            
        movie_popularity = all_ratings.groupby('movieId')['rating'].count()
        total_ratings = len(all_ratings)
        
        novelty_scores = []
        for movie_id in recommendations['movieId']:
            popularity = movie_popularity.get(movie_id, 1)
            novelty = -np.log2(popularity / total_ratings)
            novelty_scores.append(novelty)
            
        return np.mean(novelty_scores) if novelty_scores else 0
        
    def evaluate_recommender(self, recommender, test_users, k=10):
        """Comprehensive evaluation of a recommender system"""
        results = {
            'precision': [],
            'recall': [],
            'diversity': [],
            'novelty': []
        }
        
        for user_id in test_users:
            # Get recommendations
            if hasattr(recommender, 'get_user_recommendations'):
                recs = recommender.get_user_recommendations(user_id, top_n=k)
            else:
                continue
                
            if recs is None or len(recs) == 0:
                continue
                
            # Get user's actual ratings
            user_ratings = self.test_ratings[self.test_ratings['userId'] == user_id]
            
            if len(user_ratings) == 0:
                continue
                
            # Calculate metrics
            precision, recall = self.calculate_precision_recall_at_k(
                recs, user_ratings, k
            )
            diversity = self.calculate_diversity(recs)
            novelty = self.calculate_novelty(recs, self.test_ratings)
            
            results['precision'].append(precision)
            results['recall'].append(recall)
            results['diversity'].append(diversity)
            results['novelty'].append(novelty)
            
        # Calculate averages
        avg_results = {
            'avg_precision': np.mean(results['precision']),
            'avg_recall': np.mean(results['recall']),
            'avg_diversity': np.mean(results['diversity']),
            'avg_novelty': np.mean(results['novelty'])
        }
        
        return avg_results, results
        
    def plot_evaluation_results(self, results_dict):
        """Plot evaluation results comparison"""
        fig, axes = plt.subplots(2, 2, figsize=(12, 10))
        
        metrics = ['avg_precision', 'avg_recall', 'avg_diversity', 'avg_novelty']
        titles = ['Average Precision@10', 'Average Recall@10', 
                 'Average Diversity', 'Average Novelty']
        
        for i, (metric, title) in enumerate(zip(metrics, titles)):
            ax = axes[i//2, i%2]
            
            systems = list(results_dict.keys())
            values = [results_dict[system][metric] for system in systems]
            
            bars = ax.bar(systems, values)
            ax.set_title(title)
            ax.set_ylabel('Score')
            
            # Add value labels on bars
            for bar, value in zip(bars, values):
                ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.001,
                       f'{value:.3f}', ha='center', va='bottom')
                       
        plt.tight_layout()
        plt.show()

# Example usage
evaluator = RecommendationEvaluator(loader.ratings, loader.movies)

# Evaluate collaborative recommender
print("Evaluating Collaborative Recommender...")
test_users = loader.ratings['userId'].unique()[:100]  # Sample users
collab_results, _ = evaluator.evaluate_recommender(collab_rec, test_users)

print("Collaborative Filtering Results:")
for metric, value in collab_results.items():
    print(f"{metric}: {value:.4f}")
```

## Web Interface with Flask

Create `app.py`:

```python
from flask import Flask, render_template, request, jsonify
import pandas as pd
import json

app = Flask(__name__)

# Initialize recommenders (assuming they're already trained)
# loader, content_rec, collab_rec, hybrid_rec = initialize_recommenders()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/search_movies', methods=['GET'])
def search_movies():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
        
    # Search movies by title
    matches = loader.movies[
        loader.movies['clean_title'].str.contains(query, case=False, na=False)
    ].head(10)
    
    results = []
    for _, movie in matches.iterrows():
        results.append({
            'id': movie['movieId'],
            'title': movie['title'],
            'genres': movie['genres'] if isinstance(movie['genres'], list) else [],
            'year': movie['year'],
            'rating': movie['rating_mean']
        })
        
    return jsonify(results)

@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    data = request.json
    rec_type = data.get('type', 'hybrid')
    user_id = data.get('user_id')
    movie_title = data.get('movie_title')
    genres = data.get('genres', [])
    
    try:
        if rec_type == 'content' and movie_title:
            recs = content_rec.get_recommendations(movie_title, top_n=10)
        elif rec_type == 'collaborative' and user_id:
            recs = collab_rec.get_user_recommendations(user_id, top_n=10)
        elif rec_type == 'hybrid':
            recs = hybrid_rec.get_hybrid_recommendations(
                user_id=user_id, 
                movie_title=movie_title, 
                top_n=10
            )
        elif rec_type == 'genre' and genres:
            recs = content_rec.get_genre_recommendations(genres, top_n=10)
        else:
            return jsonify({'error': 'Invalid request parameters'})
            
        if recs is None or len(recs) == 0:
            return jsonify({'recommendations': []})
            
        # Convert to JSON format
        recommendations = []
        for _, movie in recs.iterrows():
            recommendations.append({
                'title': movie['title'],
                'genres': movie.get('genres', []),
                'year': movie.get('year'),
                'rating': movie.get('rating_mean'),
                'score': movie.get('similarity_score', movie.get('predicted_rating', 0))
            })
            
        return jsonify({'recommendations': recommendations})
        
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/popular', methods=['GET'])
def get_popular_movies():
    try:
        popular = loader.get_popular_movies(top_n=20)
        
        movies = []
        for _, movie in popular.iterrows():
            movies.append({
                'title': movie['title'],
                'genres': movie['genres'] if isinstance(movie['genres'], list) else [],
                'year': movie['year'],
                'rating': movie['rating_mean'],
                'count': movie['rating_count']
            })
            
        return jsonify({'movies': movies})
        
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
```

## Frontend Template

Create `templates/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Recommendation System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">
            🎬 Movie Recommendation System
        </h1>
        
        <!-- Search Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-semibold mb-4">Find Recommendations</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Search Movie:</label>
                    <input type="text" id="movieSearch" placeholder="Enter movie title..."
                           class="w-full px-3 py-2 border border-gray-300 rounded-md">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">User ID (optional):</label>
                    <input type="number" id="userId" placeholder="Enter user ID..."
                           class="w-full px-3 py-2 border border-gray-300 rounded-md">
                </div>
            </div>
            
            <div class="mt-4">
                <label class="block text-sm font-medium mb-2">Recommendation Type:</label>
                <select id="recType" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="hybrid">Hybrid (Best)</option>
                    <option value="content">Content-Based</option>
                    <option value="collaborative">Collaborative Filtering</option>
                    <option value="genre">Genre-Based</option>
                </select>
            </div>
            
            <button onclick="getRecommendations()" 
                    class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Recommendations
            </button>
        </div>
        
        <!-- Results Section -->
        <div id="results" class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold mb-4">Recommendations</h2>
            <div id="recommendations" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Recommendations will be populated here -->
            </div>
        </div>
    </div>

    <script>
        async function getRecommendations() {
            const movieTitle = document.getElementById('movieSearch').value;
            const userId = document.getElementById('userId').value;
            const recType = document.getElementById('recType').value;
            
            const requestData = {
                type: recType,
                movie_title: movieTitle || null,
                user_id: userId ? parseInt(userId) : null
            };
            
            try {
                const response = await axios.post('/api/recommend', requestData);
                displayRecommendations(response.data.recommendations || []);
            } catch (error) {
                console.error('Error getting recommendations:', error);
                alert('Error getting recommendations. Please try again.');
            }
        }
        
        function displayRecommendations(recommendations) {
            const container = document.getElementById('recommendations');
            
            if (recommendations.length === 0) {
                container.innerHTML = '<p class="text-gray-500">No recommendations found.</p>';
                return;
            }
            
            container.innerHTML = recommendations.map(movie => `
                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 class="font-semibold text-lg mb-2">${movie.title}</h3>
                    <p class="text-sm text-gray-600 mb-1">
                        <strong>Genres:</strong> ${movie.genres.join(', ')}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                        <strong>Year:</strong> ${movie.year || 'N/A'}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                        <strong>Rating:</strong> ${movie.rating ? movie.rating.toFixed(1) : 'N/A'}/5
                    </p>
                    <p class="text-sm text-blue-600">
                        <strong>Score:</strong> ${movie.score.toFixed(3)}
                    </p>
                </div>
            `).join('');
        }
        
        // Load popular movies on page load
        window.addEventListener('load', async () => {
            try {
                const response = await axios.get('/api/popular');
                displayRecommendations(response.data.movies || []);
            } catch (error) {
                console.error('Error loading popular movies:', error);
            }
        });
    </script>
</body>
</html>
```

## Key Takeaways

1. **Multiple Approaches**: Content-based, collaborative, and hybrid methods each have strengths
2. **Data Quality**: Good preprocessing is crucial for accurate recommendations
3. **Cold Start Problem**: Use content-based filtering for new users
4. **Evaluation**: Use multiple metrics to assess recommendation quality
5. **Scalability**: Consider computational complexity for large datasets

This comprehensive movie recommendation system demonstrates practical machine learning applications and can be extended with deep learning approaches, real-time updates, and advanced evaluation metrics.

## Next Steps

- Implement deep learning models (neural collaborative filtering)
- Add real-time learning capabilities
- Include implicit feedback (views, clicks)
- Implement A/B testing framework
- Add explainable AI features
- Scale with distributed computing (Spark, Dask)
