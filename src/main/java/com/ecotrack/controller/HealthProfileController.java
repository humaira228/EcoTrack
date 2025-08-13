package com.ecotrack.controller;

import com.ecotrack.model.HealthProfile;
import com.ecotrack.model.User;
import com.ecotrack.repository.HealthProfileRepository;
import com.ecotrack.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class HealthProfileController {

    private final HealthProfileRepository healthProfileRepository;
    private final UserRepository userRepository;

    public HealthProfileController(HealthProfileRepository healthProfileRepository,
                                   UserRepository userRepository) {
        this.healthProfileRepository = healthProfileRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public HealthProfile saveProfile(@RequestBody HealthProfile profile, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        profile.setUserEmail(user.getEmail());
        return healthProfileRepository.save(profile);
    }

    @GetMapping
    public HealthProfile getProfile(Authentication authentication) {
        String email = authentication.getName();
        return healthProfileRepository.findByUserEmail(email);
    }
}