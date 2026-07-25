package com.yognasetu.repository;

import com.yognasetu.model.Scheme;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface SchemeRepository extends MongoRepository<Scheme, String> {
    List<Scheme> findByActiveTrue();
    List<Scheme> findByTitleContainingIgnoreCaseAndActiveTrue(String title);
    List<Scheme> findByCategoryIgnoreCaseAndActiveTrue(String category);
    
    List<Scheme> findTop6ByActiveTrueOrderByCreatedAtDesc();
    List<Scheme> findTop5ByActiveTrueOrderByCreatedAtDesc();

    @Query("{ 'active': true, $or: [ " +
           "{ 'title': { $regex: ?0, $options: 'i' } }, " +
           "{ 'description': { $regex: ?0, $options: 'i' } }, " +
           "{ 'category': { $regex: ?0, $options: 'i' } }, " +
           "{ 'department': { $regex: ?0, $options: 'i' } } " +
           "] }")
     List<Scheme> searchSchemes(String keyword);
}
