package com.yognasetu.service;

import com.yognasetu.dto.SchemeDto;
import java.util.List;

public interface SchemeService {
    SchemeDto createScheme(SchemeDto schemeDto);
    SchemeDto updateScheme(String id, SchemeDto schemeDto);
    void deleteScheme(String id);
    List<SchemeDto> getActiveSchemes();
    SchemeDto getSchemeById(String id);
    List<SchemeDto> searchSchemes(String keyword);
    List<SchemeDto> getSchemesByCategory(String category);
    List<SchemeDto> getLatestActiveSchemes();
    List<SchemeDto> getFeaturedSchemes();
}
