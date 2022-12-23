# Generated by Django 4.1.4 on 2022-12-23 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_auto_20200925_1432'),
    ]

    operations = [
        migrations.AlterField(
            model_name='show',
            name='seats',
            field=models.JSONField(default={'B': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'C': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'D': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'E': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'F': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'G': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'H': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'I': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'J': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'K': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'L': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'M': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'N': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'O': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'P': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}, 'Q': {1: 'Vacant', 2: 'Vacant', 3: 'Vacant', 4: 'Vacant', 5: 'Vacant', 6: 'Vacant', 7: 'Vacant', 8: 'Vacant', 9: 'Vacant', 10: 'Vacant', 11: 'Vacant', 12: 'Vacant', 13: 'Vacant', 14: 'Vacant', 15: 'Vacant', 16: 'Vacant', 17: 'Vacant', 18: 'Vacant', 19: 'Vacant', 20: 'Vacant', 21: 'Vacant'}}),
        ),
    ]
