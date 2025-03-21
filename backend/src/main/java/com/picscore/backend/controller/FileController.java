package main.java.com.picscore.backend.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.회사명.프로젝트명.service.S3Service;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {
    
    private final S3Service s3Service;
    
    public FileController(S3Service s3Service) {
        this.s3Service = s3Service;
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = s3Service.uploadFile(file);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("파일 업로드 실패: " + e.getMessage());
        }
    }
    
    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
        byte[] data = s3Service.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
    
    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        try {
            s3Service.deleteFile(fileName);
            return ResponseEntity.ok("파일 삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("파일 삭제 실패: " + e.getMessage());
        }
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<String>> listFiles() {
        return ResponseEntity.ok(s3Service.listFiles());
    }
}