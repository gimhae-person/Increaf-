package com.main19.server.chat.controller;

import com.main19.server.chat.dto.ChatDto;
import com.main19.server.chat.dto.ChatDto.Post;
import com.main19.server.chat.entitiy.Chat;
import com.main19.server.chat.mapper.ChatMapper;
import com.main19.server.chat.service.ChatService;
import com.main19.server.chatroom.service.ChatRoomService;
import com.main19.server.exception.BusinessLogicException;
import com.main19.server.exception.ExceptionCode;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class KafkaController {

    @Value("${kafka.topic}")
    private String topic;

    private final KafkaTemplate<String, Post> kafkaTemplate;
    private final ChatRoomService chatRoomService;
    private final ChatService chatService;
    private final ChatMapper chatMapper;


    @MessageMapping("/message")
    public void message(ChatDto.Post chatDto) {

        if(chatRoomService.findChatRoom(chatDto.getChatRoomId()) == null) {
            throw new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND);
        }
        try {
            kafkaTemplate.send(topic, chatDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/message/{room-id}")
    public ResponseEntity getAllChat(@RequestHeader(name = "Authorization") String token,
        @PathVariable("room-id") @Positive long roomId) {

        List<Chat> chat = chatService.findAllChat(roomId,token);
        List<ChatDto.Response> response = chatMapper.chatToChatDtoResponse(chat);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
