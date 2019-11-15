package com.sharedlist.api

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder
import java.util.UUID

data class Item(val name: String)

fun main() {
    Javalin.create{ config ->
        config.enableCorsForAllOrigins()
    }
    .routes {
        ApiBuilder.get("/api/items") { context ->
            context.json(listOf(Item("Сакхар"), Item("Сало")))
        }

        ApiBuilder.get("/") { context ->
            context.result("Go duck yourself")
        }
    }
    .start(8080)
}

data class ItemList private constructor(val id: String, val items: MutableList<Item>){
    companion object {
        fun create() = ItemList(UUID.randomUUID().toString(), ArrayList())
    }
}